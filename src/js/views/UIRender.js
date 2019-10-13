import { htmlElements } from './base'

//CREATE TITLES ACORDING TO CURRENT GUSVAR
export const renderTitle = ({ firstVar, secondVar }) => {
    //get html element and put name
    htmlElements.versusBarChart.firstVarTitle.innerText = firstVar.name;
    htmlElements.versusBarChart.secondVarTitle.innerText = secondVar.name;
};

export const renderShowHideTitle = ({ firstVar, secondVar }) => {
    //get html element and put name
    htmlElements.versusBarChart.firstVarshowHideTitle.innerText = firstVar.shortName;
    htmlElements.versusBarChart.secondVarshowHideTitle.innerText = secondVar.shortName;
};

//CREATE sort TITLES ACORDING TO CURRENT GUSVAR
export const renderSortTitle = ({ firstVar, secondVar }) => {
    //get html element and put short name
    htmlElements.versusBarChart.firstVarSortTitle.innerText = firstVar.shortName;
    htmlElements.versusBarChart.secondVarSortTitle.innerText = secondVar.shortName;
};

//RENDER SEPARATOR FOR VAR TITLE
export const renderVarSeparator = (status) =>{
    if(status === "checked"){
        htmlElements.versusBarChart.varSeparator.innerText = "/"
    }else{
        htmlElements.versusBarChart.varSeparator.innerText = "vs"
    }
};

//DISABLE BUTTONS VERSUS BAR CHART 
export const versusBarChart__disableButtons = () => {

    //1. DISABLE BUTTONS FOR SORTING
    htmlElements.versusBarChart.buttonsSort.forEach( el => {
        el.parentNode.querySelector('.radioBox__input').disabled = true;
    });

    //2. DISABLE BUTTONS FOR SORTING AND UNCHECKED THEM
    htmlElements.versusBarChart.buttonsShowHide.forEach( el => {
        el.parentNode.querySelector('.checkboxBox__input').disabled = true;
        el.parentNode.querySelector('.checkboxBox__input').checked = false;

    })
}

//DISABLE BUTTONS VERSUS BAR CHART 
export const versusBarChart__enableButtons = ( {firstVarHidden , secondVarHidden } ) => {

    //1. ENABLE BUTTONS FOR SORTING
    htmlElements.versusBarChart.buttonsSort.forEach( el => {
        el.parentNode.querySelector('.radioBox__input').disabled = false;
    });

    //2. ENABLE BUTTONS FOR SORTING
    htmlElements.versusBarChart.buttonsShowHide.forEach( el => {
        el.parentNode.querySelector('.checkboxBox__input').disabled = false;
    })

    //3. CHECKED BUTTONS FOR SORTING ACORDING TO CURRENT STATE
    htmlElements.versusBarChart.buttonsShowHide[0].parentNode.parentNode.querySelector('#showHideVar1').checked = !firstVarHidden;
    htmlElements.versusBarChart.buttonsShowHide[0].parentNode.parentNode.querySelector('#showHideVar2').checked = !secondVarHidden;
    
};


//INFOBOX SHOW/HIDE
export const showHideInfoBox = () =>{
    htmlElements.infoBox.infoBox.classList.toggle('infoBox--hide');
};

//LOADERS 
export const barChart__loaders = () => {
    const loaders = htmlElements.versusBarChart.loaders;
    
    Array.from(loaders).forEach(loader =>{
        loader.classList.toggle('section__loaderBox--hidden');
    })

};