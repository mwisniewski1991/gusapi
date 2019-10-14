export const htmlElements = {
    shadow: document.querySelector('.shadow'),
    infoBox: {
        //INFO BOX
        infoBoxTurnOnButton: document.querySelector('#infoBoxTurnOnButton'),
        infoBoxTurnOffButton: document.querySelector('#infoBoxTurnOffButton'),
        infoBox: document.querySelector('.infoBox'),
    },
    selectVarBoxes: {
        boxes: Array.from(document.querySelectorAll('.selectVarBox')),
        firstVarBox: document.querySelector('#selectVarBox__firstVar'),
        secondVarBox: document.querySelector('#selectVarBox__secondVar'),
        buttons: Array.from(document.querySelectorAll('.section__headingTitleButton')),
    },
    charts: {
        versusBarChart: document.querySelector('#versusBarChart__chart'),
        scatterChart: document.querySelector('#scatterChart__chart')
    },
    versusBarChart: {
        //TITLES
        firstVarTitle: document.querySelector("#versusBarChart__firstVarTitle"),
        secondVarTitle: document.querySelector("#versusBarChart__secondVarTitle"),
        varSeparator: document.querySelector("#versusBarChart__varSeparator"),
        //SHOW/HIDE
        firstVarshowHideTitle: document.querySelector("#versusBarChart__firstVarshowHideTitle"),
        secondVarshowHideTitle: document.querySelector("#versusBarChart__secondVarshowHideTitle"),
        buttonsShowHide: Array.from(document.querySelectorAll(".versusBarChartCtrl__buttonShowHide")),
        //SORT
        firstVarSortTitle: document.querySelector("#versusBarChart__firstVarSortTitle"),
        secondVarSortTitle: document.querySelector("#versusBarChart__secondVarSortTitle"),
        buttonsSort: Array.from(document.querySelectorAll(".versusBarChartCtrl__buttonSort")),
        //CROSSED VARS
        buttonAddCrossedVars: document.querySelector('#versusBarChart__crossedVars'),
        //LOADERS
        barChartLoader: document.querySelector('#barChart__loader'),
        loaders: document.querySelectorAll('.section__loaderBox'),
        

        spanCurrentYear: document.querySelector(".versusBarChart__year"),
        buttonsChangeYear: Array.from(document.querySelectorAll(".versusBarChartCtrl__button"))
    },

}
