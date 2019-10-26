import '../styles/main.scss'; //IMPORT SASS
import "babel-polyfill"; //IMPORT BABEL FOR ASYNC/AWAIT
import GusApi from './models/gusapi'
import * as UIRender from './views/UIRender'
import * as chartsView from './views/chartsView'
import { htmlElements } from './views/base'

const state = {};


//POPULATION CONTROLLER---------------------------------------------------------------------------------------------------------------
const versusBarChart__controller = async (firstVar="population", secondVar="area") =>{

    //UI loader start - barChart
    UIRender.barChart__loaders();

    //1.get data
    if(state.gusApi === undefined){
        state.gusApi = new GusApi; // create new class
    }

    //-------------------------------------------------------------------------------------------------
    //DATA --------------------------------------------------------------------------------------------

    //API FROM BROWSER FOR TESTING NEW VARS
    // await state.gusApi.getAPIDataTEST(firstVar, 'secondVar');

    // API FROM BROWSER
    // await state.gusApi.getAPIData(firstVar, 'firstVar');
    // await state.gusApi.getAPIData(secondVar, 'secondVar');

    // APIFROM FILE 
    // state.gusApi.getRawData(firstVar, 'firstVar'); //load data from api TESTING VERSION FROM JS !!!!!!!!!!!!!!!!!!!!
    // state.gusApi.getRawData(secondVar, 'secondVar'); //load data from api TESTING VERSION FROM JS !!!!!!!!!!!!!!!!!!!!

    // 1. API FROM NODE
    await state.gusApi.getAPIDataNode(firstVar, 'firstVar');
    await state.gusApi.getAPIDataNode(secondVar, 'secondVar');

    //2. Render DOM elements titles for VAR
    UIRender.renderTitle(state.gusApi.gusVar); //titles
    UIRender.renderShowHideTitle(state.gusApi.gusVar); //showHide titles
    UIRender.renderSortTitle(state.gusApi.gusVar); //sort titles

    //3.set current year
    state.gusApi.versusBarChartSetCurrentYear(2018); //set current year -deafult 2018 

    //4.set currrent screen size 
    state.gusApi.setCurrentScreenSize();

    //5 set show hide status of gusVars
    state.gusApi.versusBarChartSetShowHide()

    //6.transform data - input data and year
    state.gusApi.getTranformData('firstVar');
    state.gusApi.getTranformData('secondVar');

    //7. data for chart - create 3 arrays which will be pass as argument to chart 
    state.gusApi.getChartData('first');

    //8. update labels
    if(state.gusApi.screenSize === "small"){
        state.gusApi.versusBarChartChangeLabels(state.gusApi.screenSize); //change labels
    }

    //UI loader end - barChart
    UIRender.barChart__loaders();


    //get gusvar names
    const currentVarNames = {
        firstVarName: state.gusApi.gusVar.firstVar.name,
        secondVarName: state.gusApi.gusVar.secondVar.name
    };
    
    //-------------------------------------------------------------------------------------------------
    //BAR CHART ---------------------------------------------------------------------------------------
    //9. render bar chart
    chartsView.versusBarChartRender(state.gusApi.barChart.data, state, state.gusApi.barChart.chartConfig.hideShow, currentVarNames);

    //-------------------------------------------------------------------------------------------------
    //SCATTER CHART -----------------------------------------------------------------------------------
    //get data
    state.gusApi.scatterChart.data = state.gusApi.scatterChart__createData(); //get data
    
    
    //render scatter chart
    state.gusApi.scatterChart.chart = chartsView.scatterChartRender(
        state.gusApi.scatterChart.data, //pass data for chart
        currentVarNames, //pass var names for axis names
        state.gusApi.scatterChart.chart //pass if create new or update exist chart
    );
    
    //SELECT VAR BOX - RENDER BUTTONS
    if(document.querySelectorAll('.selectVarBox__button').length === 0){ //chech if buttons is already rendered
        UIRender.varBoxes__buttonsRender(state.gusApi.dataSource) 
    }

    // console.log(state.gusApi);
};
//LAUNCH CONTROLLER
versusBarChart__controller();

//*******************************************************************************************************
//CHANGE GUS VAR
const changeGusVar = (event) => {

    // console.log(Array.from(event.target.classList));        
    const classList = Array.from(event.target.classList);
    // const firstVar = "";

    if(classList.includes("selectVarBox__button")){

        // console.log(event.target.id);
        // console.log(classList[1].replace("selectVarBox__button--",""));
        const classes = classList[1].replace("selectVarBox__button--","");
        let firstVar;
        let secondVar;

        if(classes === "firstVar"){
            firstVar = event.target.id;
            secondVar = state.gusApi.gusVar.secondVar.id
            UIRender.varBoxes__showHideSecond("firstVar");
        }
        if(classes === "secondVar"){
            secondVar = event.target.id;
            firstVar = state.gusApi.gusVar.firstVar.id
            UIRender.varBoxes__showHideSecond("secondVar");
        }
        
        versusBarChart__controller(firstVar, secondVar);

        // DEAFULT STATE FOR CONTROLLER - IT SHOULD BE BETTER
            //1. ENABLE BUTTONS
            UIRender.versusBarChart__enableButtons(state.gusApi.barChart.chartConfig.hideShow); //pass argument which buttons need to be checked

            //2. ADD EVENT LISTENNERS
            htmlElements.versusBarChart.buttonsSort.forEach(el =>{
                el.addEventListener('click', versusBarChart__sort)
            });

            htmlElements.versusBarChart.buttonsShowHide.forEach( el => {
                el.addEventListener('click', versusBarChart__showHide);
            })

            //3. SORT BUTTONS DEFAULT STATE
            htmlElements.versusBarChart.buttonsSort[0].parentNode.querySelector('.radioBox__input').checked = true;
            htmlElements.versusBarChart.buttonsSort[1].parentNode.querySelector('.radioBox__input').checked = false;

            //4. HIDE/SHOW BUTTONS DEFAULT STATE
            htmlElements.versusBarChart.buttonsShowHide[0].parentNode.querySelector('.checkboxBox__input').checked = true;
            htmlElements.versusBarChart.buttonsShowHide[1].parentNode.querySelector('.checkboxBox__input').checked = true;

            //5. CHANGE LABELS FOR SMALL SCREEEN
            if(state.gusApi.screenSize === "small"){
                state.gusApi.versusBarChartChangeLabels(state.gusApi.screenSize); //change labels
            }

            //6. UNCHECKED COMBINED BUTTON
            htmlElements.versusBarChart.buttonAddCrossedVars.parentNode.querySelector('.checkboxBox__input').checked = false;
    };
};
//*******************************************************************************************************
//*******************************************************************************************************
//VERSUR BAR CHART
//SHOW HIDE VARS
const versusBarChart__showHide = (event) =>{

    // 1. CONST NEEDED VARIABLE
    const selectedInput = event.target.parentNode.querySelector('.checkboxBox__input'); //need to checked if buttons is checked
    const selectedVars = selectedInput.id; //need to check what buttons has been clicked

    //2. CHECK WHICH BUTTONS HAS BEEN CLICKED
    if(selectedVars === "showHideVar1"){
        
        //3. CHECK IF WHAT IS CURRENT STATUS OF FIRST VAR. THEN CHANGE IT FROM TRUE TO FALSE OR FROM FALSE TO TRUE
        if(selectedInput.checked){
            state.gusApi.barChart.chartConfig.hideShow.firstVarHidden = true; //change to hidden and save to state 
            chartsView.versusBarChartShowHide(state.gusApi.barChart.data, state); 
        }else{
            state.gusApi.barChart.chartConfig.hideShow.firstVarHidden = false; //change to visible and save to state
        }
        
    }
    if(selectedVars === "showHideVar2"){
        
        //3. CHECK IF WHAT IS CURRENT STATUS OF SECOND VAR. THEN CHANGE IT FROM TRUE TO FALSE OR FROM FALSE TO TRUE
        if(selectedInput.checked){
            state.gusApi.barChart.chartConfig.hideShow.secondVarHidden = true; //change to hidden and save to state
        }else{
            state.gusApi.barChart.chartConfig.hideShow.secondVarHidden = false; //change to visible and save to state
        }   
    }

    //4. RENDER CHART
    const currentVarNames = {
        firstVarName: state.gusApi.gusVar.firstVar.name,
        secondVarName: state.gusApi.gusVar.secondVar.name
    };
    
    chartsView.versusBarChartRender(state.gusApi.barChart.data, state, state.gusApi.barChart.chartConfig.hideShow, currentVarNames);
}

//CHANGE SORT BEETWEN FIRST ANS SECOND GUSVAR
const versusBarChart__sort = (event) => {

    //1. GET INPUT VALUE FROM HTML
    const inputValue = event.target.parentNode.querySelector('.radioBox__input').value;

    //2. GET VARIABLE TO KNOW WHAT SORT OPTION ID CURRENTLY CHECKED
    const currentVersusSort = state.gusApi.barChart.chartConfig.versusSort;

    //3. UPDATE CHART ONLY IF INPUT IS DIFFRENT THAN CURRENT CHART
    if(inputValue !== currentVersusSort){
        //1. SET VALUE DEPENDS ON WHICH BUTTON HAS BEEN CLICKED
        const sortType = inputValue === "first" ? "first" : 'second';

        //2. SORT DATA
        state.gusApi.getChartData(sortType);

        //3. CHANGE LABELS FOR SMALL SCREEEN
        if(state.gusApi.screenSize === "small"){
            state.gusApi.versusBarChartChangeLabels(state.gusApi.screenSize); //change labels
        }

        //4. RENDER CHART
        const currentVarNames = {
            firstVarName: state.gusApi.gusVar.firstVar.name,
            secondVarName: state.gusApi.gusVar.secondVar.name
        };
        
        chartsView.versusBarChartRender(state.gusApi.barChart.data, state, state.gusApi.barChart.chartConfig.hideShow, currentVarNames);
    }
};

//SHOW COMBINED DATA
const versusBarChart__showCombinedData = (event) =>{

    //1. GET EVENT INPUT STATUS 
    const status = event.target.parentNode.querySelector('.checkboxBox__input');

    //2. CHANGE VAR SEPARATOR
    if(status.checked){
        UIRender.renderVarSeparator("checked")
    }else{
        UIRender.renderVarSeparator("not checked")
    }

    if(status.checked){
        // console.log('zaznaczony');

        //1. DISABLE BUTTONS
        UIRender.versusBarChart__disableButtons();
        

        //2. REMOVE EVENT LISTENNERS
        htmlElements.versusBarChart.buttonsSort.forEach(el =>{
            el.removeEventListener('click', versusBarChart__sort);
        });

        htmlElements.versusBarChart.buttonsShowHide.forEach( el => {
            el.removeEventListener('click', versusBarChart__showHide);
        })

        //4. SORT DATA 
        state.gusApi.getChartData('combined');

        //5. CHANGE LABELS FOR SMALL SCREEEN
        if(state.gusApi.screenSize === "small"){
            state.gusApi.versusBarChartChangeLabels(state.gusApi.screenSize); //change labels
        }

        //6. SHOW COMBINED DATA     
        chartsView.versusBarChartShowCombined(state.gusApi.barChart.data, state);

    }else{
        // console.log('nie zaznaczony');

        //1. ENABLE BUTTONS
        UIRender.versusBarChart__enableButtons(state.gusApi.barChart.chartConfig.hideShow); //pass argument which buttons need to be checked

        //2. ADD EVENT LISTENNERS
        htmlElements.versusBarChart.buttonsSort.forEach(el =>{
            el.addEventListener('click', versusBarChart__sort)
        });

        htmlElements.versusBarChart.buttonsShowHide.forEach( el => {
            el.addEventListener('click', versusBarChart__showHide);
        })

        //get variable to know what sort option has been checked
        const currentVersusSort = state.gusApi.barChart.chartConfig.versusSort;
        
        //3. GET CHECKED ON FIRST VALUE ACCORDING TO CURRENT STATE SORT STATUS
        if(currentVersusSort === "first"){
            htmlElements.versusBarChart.buttonsSort[0].parentNode.querySelector('.radioBox__input').checked = true;
            htmlElements.versusBarChart.buttonsSort[1].parentNode.querySelector('.radioBox__input').checked = false;
        }else{
            htmlElements.versusBarChart.buttonsSort[0].parentNode.querySelector('.radioBox__input').checked = false;
            htmlElements.versusBarChart.buttonsSort[1].parentNode.querySelector('.radioBox__input').checked = true;
        }

        //4. SORT DATA 
        state.gusApi.getChartData(currentVersusSort);

         //5. CHANGE LABELS FOR SMALL SCREEEN
        if(state.gusApi.screenSize === "small"){
            state.gusApi.versusBarChartChangeLabels(state.gusApi.screenSize); //change labels
        }

        //6. SHOW VERSUS DATA
        const currentVarNames = {
            firstVarName: state.gusApi.gusVar.firstVar.name,
            secondVarName: state.gusApi.gusVar.secondVar.name
        };

        chartsView.versusBarChartRender(state.gusApi.barChart.data, state, state.gusApi.barChart.chartConfig.hideShow, currentVarNames);
    }
};

//CHANGE LABELS ON SMALL SCREEN
const versusBarChart__changeLabels = () =>{

    //1. SAVE CURRENT SCREEN STATUS, NEED AT THE END TO CHECK IS CHANGE IS NEEDED
    const currentScreenState =  state.gusApi.screenSize;

    //2. CHANGE STATE SCREEN SIZE ACORDING TO CURRENT USER SCREEN
    if(window.innerWidth < 600){
        state.gusApi.screenSize = "small";
    }
    if(window.innerWidth > 600){
        state.gusApi.screenSize = "big";
    }

    //3. CHECK IF THERE IS ANY CHANGES IF YES CHANGE LABELS AND RENDER CHART AGAIN.
    if(currentScreenState !== state.gusApi.screenSize){
        state.gusApi.versusBarChartChangeLabels(state.gusApi.screenSize); //change labels
        const currentVarNames = {
            firstVarName: state.gusApi.gusVar.firstVar.name,
            secondVarName: state.gusApi.gusVar.secondVar.name
        };
        chartsView.versusBarChartRender(state.gusApi.barChart.data, state, state.gusApi.barChart.chartConfig.hideShow, currentVarNames); //render cahrt
    };
};
//*******************************************************************************************************

//EVENT LISTENERS-----------------------------------------------------------------------------------------------------------------------
//*******************************************************************************************************
//VERSUR BAR CHART
//SHOW HIDE VARS
htmlElements.versusBarChart.buttonsShowHide.forEach(el => {
    el.addEventListener('click', versusBarChart__showHide);
});

//CHANGE SORT BEETWEN FIRST ANS SECOND GUSVAR
htmlElements.versusBarChart.buttonsSort.forEach(el =>{
    el.addEventListener('click', versusBarChart__sort)
});

//SHOW COMBINED DATA
htmlElements.versusBarChart.buttonAddCrossedVars.parentNode.querySelector('.checkboxBox__input').addEventListener('change', versusBarChart__showCombinedData);

// WINDOW RESIZE - CHANGE LABELS
window.addEventListener('resize', versusBarChart__changeLabels);
//*******************************************************************************************************

//*******************************************************************************************************
//UI
//INFOBOX
htmlElements.infoBox.infoBoxTurnOnButton.addEventListener('click', UIRender.showHideInfoBox);
htmlElements.infoBox.infoBoxTurnOffButton.addEventListener('click', UIRender.showHideInfoBox);

//VAR BOXES - SHOW HIDE/CHANGE GUS VAR
htmlElements.selectVarBoxes.buttons.forEach(el => {
    el.addEventListener('click', UIRender.varBoxes__showHide) //showHide
});
htmlElements.selectVarBoxes.boxes.forEach(el => {
    el.addEventListener('click', changeGusVar) //change GUS VAR
});
//*******************************************************************************************************
