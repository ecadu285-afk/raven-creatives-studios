"use strict";
const R3_WHATSAPP="5582988835803";
const r3Services=fetch("servicos.json").then(r=>{if(!r.ok)throw Error("Catálogo indisponível");return r.json()});
const toggle=document.getElementById("menuToggle"),nav=document.getElementById("menuMobile");
toggle?.addEventListener("click",()=>{const open=nav.classList.toggle("active");toggle.setAttribute("aria-expanded",String(open));});
const current=location.pathname.split("/").pop()||"index.html";
nav?.querySelectorAll("a").forEach(a=>{if(a.getAttribute("href")===current||(current==="servico.html"&&a.getAttribute("href")==="servicos.html"))a.classList.add("r3-active");});
function node(tag,cls,content){const el=document.createElement(tag);if(cls)el.className=cls;if(content!==undefined)el.textContent=content;return el;}
function wa(message){return `https://wa.me/${R3_WHATSAPP}?text=${encodeURIComponent(message)}`;}
const grid=document.getElementById("r3Grid");
if(grid)r3Services.then(items=>{
 const search=document.getElementById("r3Search"),filters=document.getElementById("r3Filters"),count=document.getElementById("r3Count");let cat="Todos";
 const categories=["Todos",...new Set(items.map(x=>x.categoria))];
 function render(){const term=search.value.trim().toLocaleLowerCase("pt-BR");const found=items.filter(x=>(cat==="Todos"||x.categoria===cat)&&[x.nome,x.descricao,x.categoria].join(" ").toLocaleLowerCase("pt-BR").includes(term));grid.replaceChildren();count.textContent=`${found.length} serviço(s) encontrado(s)`;for(const s of found){const card=node("article","r3-card");card.append(node("span","tag",s.categoria),node("h2","",s.nome),node("p","",s.descricao),node("span","r3-price",s.preco));const a=node("a","button secondary","Conhecer serviço ↗");a.href=`servico.html?id=${encodeURIComponent(s.id)}`;card.append(a);grid.append(card);}}
 for(const c of categories){const b=node("button","",c);b.type="button";b.setAttribute("aria-pressed",String(c===cat));b.addEventListener("click",()=>{cat=c;filters.querySelectorAll("button").forEach(el=>el.setAttribute("aria-pressed",String(el===b)));render();});filters.append(b);}
 search.value=new URLSearchParams(location.search).get("busca")||"";search.addEventListener("input",render);render();
}).catch(()=>{document.getElementById("r3Count").textContent="Não foi possível carregar o catálogo. Abra o site por um servidor local.";});
const detail=document.getElementById("r3Detail");
if(detail)r3Services.then(items=>{const s=items.find(x=>x.id===new URLSearchParams(location.search).get("id"));if(!s){detail.append(node("h1","","Serviço não encontrado"));return;}document.title=`${s.nome} | Raven Creatives Studios`;detail.append(node("p","tag",s.categoria),node("h1","",s.nome),node("p","r3-muted",s.descricao),node("h2","", "O que inclui ou pode ser desenvolvido"));const ul=node("ul","r3-detail-list");for(const feature of s.recursos||[])ul.append(node("li","",feature));detail.append(ul,node("p","r3-price",s.preco));if(s.status==="futuro")detail.append(node("p","r3-muted","Projeto futuro: ainda não disponível para contratação."));else if(s.status==="avancado")detail.append(node("p","r3-muted","Sujeito a avaliação técnica e definição de escopo."));const actions=node("div","r3-actions");const a=node("a","button primary","Solicitar avaliação ↗");a.href=`contato.html?servico=${encodeURIComponent(s.nome)}`;actions.append(a);detail.append(actions);}).catch(()=>detail.append(node("p","","Não foi possível carregar o serviço.")));
const form=document.getElementById("r3Contact");
if(form)r3Services.then(items=>{const select=document.getElementById("r3Service");for(const s of items){const option=node("option","",s.nome);option.value=s.nome;select.append(option);}const selected=new URLSearchParams(location.search).get("servico");if(selected&&[...select.options].some(x=>x.value===selected))select.value=selected;}).catch(()=>{});
form?.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const msg=`Olá! Vim pelo site da Raven Creatives Studios e gostaria de solicitar um orçamento.\n\nNome: ${data.get("nome")}\nServiço: ${data.get("servico")||"Orientação"}\nDetalhes: ${data.get("detalhes")||"A combinar"}`;window.open(wa(msg),"_blank","noopener,noreferrer");});
