/**
 * Backend do Checklist de Infraestrutura – Tecfag
 * Cole este código em: Planilha Google > Extensões > Apps Script
 *
 * Depois de colar:
 * 1) Troque o valor de TOKEN abaixo por uma senha simples só sua.
 * 2) Clique em "Implantar" > "Nova implantação".
 * 3) Tipo: "App da Web".
 * 4) Executar como: "Eu" (sua conta).
 * 5) Quem pode acessar: "Qualquer pessoa".
 * 6) Implantar > copie a URL gerada (termina com /exec).
 * 7) Cole essa URL na constante APPS_SCRIPT_URL do arquivo index.html.
 */

var TOKEN = 'troque-esta-senha-123';
var NOME_ABA = 'Checklists';

function doGet(e){ return handleRequest(e); }
function doPost(e){ return handleRequest(e); }

function handleRequest(e){
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try{
    var sheet = getSheet();
    var body = {};
    if (e.postData && e.postData.contents){
      try{ body = JSON.parse(e.postData.contents); }catch(err){ body = {}; }
    }
    var action = body.action || (e.parameter && e.parameter.action) || 'list';
    var token = body.token || (e.parameter && e.parameter.token) || '';

    if (token !== TOKEN){
      return respond({ ok:false, error:'não autorizado' });
    }

    if (action === 'list'){
      return respond({ ok:true, registros: listRecords(sheet) });
    }
    if (action === 'save'){
      saveRecord(sheet, body.record);
      return respond({ ok:true });
    }
    if (action === 'delete'){
      deleteRecord(sheet, body.id);
      return respond({ ok:true });
    }
    return respond({ ok:false, error:'ação inválida' });
  } catch(err){
    return respond({ ok:false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(NOME_ABA);
  if (!sheet){
    sheet = ss.insertSheet(NOME_ABA);
    sheet.appendRow(['id','nome','setor','cargo','dataAdmissao','progresso','savedAt','formData']);
  }
  return sheet;
}

function listRecords(sheet){
  var data = sheet.getDataRange().getValues();
  var rows = data.slice(1).filter(function(r){ return r[0]; });
  return rows.map(function(r){
    var formData = {};
    try{ formData = JSON.parse(r[7] || '{}'); }catch(e){}
    return { id:r[0], nome:r[1], setor:r[2], cargo:r[3], dataAdmissao:r[4], progresso:r[5], savedAt:r[6], formData:formData };
  }).reverse();
}

function saveRecord(sheet, rec){
  if (!rec || !rec.id) throw new Error('registro inválido');
  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;
  for (var i=1;i<data.length;i++){
    if (data[i][0] === rec.id){ rowIndex = i+1; break; }
  }
  var rowValues = [rec.id, rec.nome||'', rec.setor||'', rec.cargo||'', rec.dataAdmissao||'', rec.progresso||0, rec.savedAt||'', JSON.stringify(rec.formData||{})];
  if (rowIndex > -1){
    sheet.getRange(rowIndex,1,1,rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }
}

function deleteRecord(sheet, id){
  var data = sheet.getDataRange().getValues();
  for (var i=1;i<data.length;i++){
    if (data[i][0] === id){ sheet.deleteRow(i+1); return; }
  }
}

function respond(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
