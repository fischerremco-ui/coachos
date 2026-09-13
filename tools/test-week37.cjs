// Run from repository root: node tools/test-week37.cjs [pre-fix git ref]
// Uses only Node built-ins; browser layout/offline checks are separate.
const vm = require('node:vm');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const baseline = process.argv[2] || 'adfbae8';
function runtime(old = false) {
  const values = new Map();
  const element = { dataset: {}, addEventListener() {}, classList: {add(){},remove(){}}, focus(){} };
  const context = vm.createContext({ console, Date, Map, Set, URL, Blob, setTimeout, clearTimeout,
    localStorage: { getItem: key => values.get(key) ?? null, setItem: (key,value)=>values.set(key,value), removeItem:key=>values.delete(key) },
    document: { querySelector:()=>element, querySelectorAll:()=>[], body:element },
    window: { location:{hash:'#dashboard'}, clearTimeout, setTimeout, confirm:()=>true, scrollTo(){} },
    navigator:{ userAgent:'' },
  });
  for (const file of ['data.js','planner-data.js','calendar-migration.js','app.js']) {
    let code = old ? execFileSync('git',['show',`${baseline}:${file}`],{encoding:'utf8'}) : fs.readFileSync(file,'utf8');
    if (file === 'app.js') code = code.split('backButton.addEventListener("click"')[0];
    vm.runInContext(code,context);
  }
  vm.runInContext('showToast = function(message) { window.lastToast = message; }; downloadBackup = async function() { return true; };',context);
  return {context,values,run:code=>vm.runInContext(code,context)};
}
const plain=value=>JSON.parse(JSON.stringify(value));
(async()=>{
 const old=runtime(true);
 old.run(`savePlayers([{id:'test-player',firstName:'Test',lastName:'Speler'}]);
 saveMatchMinutes([{id:'old-minutes',seasonWeekId:'speelweek-2026-2027-05',playerId:'test-player',minutes:60,note:'bewaren'}]);
 upsertTeamEvaluation({id:'old-eval',seasonWeekId:'speelweek-2026-2027-04',date:'2026-09-05',scores:{},strengths:'bewaren',developmentPoint:'bewaren'});`);
 const backup=plain(await old.run('exportData({includeAttachments:false})'));
 const r=runtime();r.context.backup=backup;
 assert.equal(r.run('validateImport(backup)'),'');assert.equal(await r.run('importData(backup,"merge")'),true);
 const loaded=plain(await r.run('exportData({includeAttachments:false})'));
 for(const key of Object.keys(backup).filter(k=>!['exportedAt','seasonWeeks'].includes(k))) assert.deepEqual(loaded[key],backup[key],key);
 assert.deepEqual(loaded.seasonWeeks.map(({matchTitle,...week})=>week),backup.seasonWeeks);
 const raw=JSON.stringify([...r.values]);
 r.run('renderSeasonWeekDetail("speelweek-2026-2027-05")');assert.equal(JSON.stringify([...r.values]),raw);
 assert.match(r.run('app.innerHTML'),/DIOS O16-2 – VSV O16-1/);
 await r.run('handleClick({target:{closest: selector => selector === "[data-team-evaluation]" ? {dataset:{teamEvaluation:"speelweek-2026-2027-05"}} : null}})');
 assert.equal(r.run('window.location.hash'),'#teamevaluatie/speelweek-2026-2027-05');
 assert.equal(r.run('getParentIdForRoute({name:"teamevaluatie",id:"speelweek-2026-2027-05"})'),'speelweek-2026-2027-05');
 r.run(`var testForm = {id:'team-evaluation-form',dataset:{seasonWeekId:'speelweek-2026-2027-05'},elements:{date:{value:'2026-09-12'},strengths:{value:'Goed druk gezet'},developmentPoint:{value:'Aansluiten'}}};
 TEAM_EVALUATION_BEHAVIOURS.forEach(b=>testForm.elements['score-'+b.id]={value:'MZ'});`);
 await r.run('handleSubmit({target:testForm,preventDefault(){}})');
 const evaluation=plain(r.run('getTeamEvaluationForWeek("speelweek-2026-2027-05")'));
 assert.equal(evaluation.strengths,'Goed druk gezet');assert.equal(evaluation.seasonWeekId,'speelweek-2026-2027-05');
 await r.run('handleSubmit({target:testForm,preventDefault(){}})');assert.equal(r.run('getTeamEvaluations().length'),2);assert.equal(r.run('getTeamEvaluationForWeek("speelweek-2026-2027-05").id'),evaluation.id);
 const beforeQuota=JSON.stringify([...r.values]);
 r.run('var realSetItem = localStorage.setItem; localStorage.setItem = function(){var error=new Error("QuotaExceeded");error.name="QuotaExceededError";throw error;}; testForm.elements.strengths.value="Niet bewaren";');
 await r.run('handleSubmit({target:testForm,preventDefault(){}})');assert.equal(JSON.stringify([...r.values]),beforeQuota);assert.match(r.run('window.lastToast'),/NIET bewaard/);r.run('localStorage.setItem=realSetItem');
 r.run(`saveMatchMinutesForm({preventDefault(){},target:{dataset:{seasonWeekId:'speelweek-2026-2027-05'},querySelectorAll:()=>[{dataset:{matchMinutesPlayer:'test-player'},querySelector:selector=>selector==='[data-match-minutes-input]'?{value:'70',dataset:{recordId:'old-minutes',createdAt:''}}:{checked:true}}]}})`);
 assert.equal(r.run('getMatchMinutes()[0].minutes'),70);assert.equal(r.run('getMatchMinutes()[0].note'),'bewaren');
 const after=plain(await r.run('exportData({includeAttachments:false})'));r.context.after=after;
 assert.equal(r.run('validateImport(after)'),'');assert.deepEqual(after.teamEvaluations.find(e=>e.id==='old-eval'),backup.teamEvaluations[0]);
 assert.equal(await r.run('importData(after,"replace")'),true);
 const restored=plain(await r.run('exportData({includeAttachments:false})'));delete after.exportedAt;delete restored.exportedAt;assert.deepEqual(restored,after);
 assert.equal(r.run('getSeasonWeek("speelweek-2026-2027-04").matchTitle'),'');
 assert.equal(r.run('normalizeSeasonWeek({...getSeasonWeek("speelweek-2026-2027-05"),matchTitle:"Eigen wedstrijd"}).matchTitle'),'Eigen wedstrijd');
 console.log('PASS: old v9 backup, all entities preserved, no writes on rendering, evaluation click/save/edit/back, quota failure, same week for minutes/evaluation, minutes note preserved, backup export/replace roundtrip.');
})().catch(error=>{console.error(error);process.exitCode=1});
