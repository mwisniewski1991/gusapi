import { population } from '../data/population';
import { area } from '../data/area';
import collection from 'lodash'


export default class GusApi{
    constructor(){
        //create objects for gusVars
        this.gusVar = {
            firstVar: {},
            secondVar: {}
        };

        //region names - short and long
        this.regionsNames = {
            regionLongNames: ["OPOLSKIE", "LUBUSKIE", "PODLASKIE", "ŚWIĘTOKRZYSKIE", "WARMIŃSKO-MAZURSKIE", "ZACHODNIOPOMORSKIE", "KUJAWSKO-POMORSKIE", "LUBELSKIE", "PODKARPACKIE", "POMORSKIE", "ŁÓDZKIE", "DOLNOŚLĄSKIE", "MAŁOPOLSKIE", "WIELKOPOLSKIE", "ŚLĄSKIE", "MAZOWIECKIE"],
            regionShortnames: ["OPOL", "LUBS", "PODL","ŚK","W-M","Z-P","K-P","LUBL","PODK","POMO","ŁDKZ","DŚLK","MAŁP","WIEP","ŚLSK","MAZO"]
        }

        this.barChart = {
            chart: undefined,
            data: '',
            chartConfig: {
                currentYear: '',
                hideShow: ''
            }
        }

        this.scatterChart = {
            chart: '',
            data: '',
            chartConfig: {}
        };
         
        //list of gusVars
        this.dataSource = {
            population: {
                name: 'Ludność ogółem',
                shortName: 'Ludność',
                rawData: population.results,
                apiURL: 'https://bdl.stat.gov.pl/api/v1/data/by-variable/72305?format=json&unit-level=2&page-size=100'
            },
            area: {
                name: "Powierzchnia w km2",
                shortName: "Powierzchnia",
                rawData: area.results,
                apiURL: 'https://bdl.stat.gov.pl/api/v1/data/by-variable/2018?format=json&unit-level=2&page-size=100'
            },
            cars: {
                name: "Samochody osobowe",
                shortName: "Samochody",
                apiURL: 'https://bdl.stat.gov.pl/api/v1/data/by-variable/32561?format=json&unit-level=2&page-size=100'
            },
            highways: {
                name: 'Drogi ekspresowe i autostrady',
                shortName: 'Autostrady itp.',
                apiURL: 'https://bdl.stat.gov.pl/api/v1/data/by-variable/453823?format=json&unit-level=2&page-size=100'
                //P1722
            }
        }

        //TESTING NEW GUS VAR
        this.gusVarTEST = {
            firstVar: {},
            secondVar: {}
        };
    }

    async getAPIDataNode(cat, numVar){

        const apiURL = `/gusapi/${cat}`;

        const resposne = await fetch(apiURL);
        const data = await resposne.json();

        this.gusVar[numVar] = this.dataSource[cat];
        this.gusVar[numVar].rawData = data.results; //save data from API to state

        const min =  parseInt(this.gusVar[numVar].rawData[0].values[0].year); //find higher year
        const max =  parseInt(this.gusVar[numVar].rawData[0].values[this.gusVar[numVar].rawData[0].values.length - 1].year); //find lower year
        
        this.gusVar[numVar].yearRange = {min, max};
    }

    async getAPIDataTEST(cat, numVar){
        const url = `${proxy}${this.dataSource[cat].apiURL}`;

        const response = await fetch(url, {
            method: "GET",
            mode: 'cors',
            headers: {
                'X-ClientId': '1a7ec620-12ad-4092-9b61-08d6b5ef3084'
        }})
        const data = await response.json()

        this.gusVarTEST[numVar] = this.dataSource[cat];
        this.gusVarTEST[numVar].rawData = data.results; //save data from API to state

        const min =  parseInt(this.gusVarTEST[numVar].rawData[0].values[0].year); //find higher year
        const max =  parseInt(this.gusVarTEST[numVar].rawData[0].values[this.gusVarTEST[numVar].rawData[0].values.length - 1].year); //find lower year
        
        this.gusVarTEST[numVar].yearRange = {min, max};
    }

    async getAPIData(cat, numVar){
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const url = `${proxy}${this.dataSource[cat].apiURL}`;
        

        const response = await fetch(url, {
            method: "GET",
            mode: 'cors',
            headers: {
                'X-ClientId': '1a7ec620-12ad-4092-9b61-08d6b5ef3084'
        }})
        const data = await response.json()

        this.gusVar[numVar] = this.dataSource[cat];
        this.gusVar[numVar].rawData = data.results; //save data from API to state

        const min =  parseInt(this.gusVar[numVar].rawData[0].values[0].year); //find higher year
        const max =  parseInt(this.gusVar[numVar].rawData[0].values[this.gusVar[numVar].rawData[0].values.length - 1].year); //find lower year
        
        this.gusVar[numVar].yearRange = {min, max};
    }


    //GET DATA FROM API RIGHT NOW FOR TESTING PURPOSE FROM JS FILE !!!!!!!!!!!!!!!!!!!!!!1
    getRawData(cat, numVar){ 

        //1. save data regarding gusVar to 
        this.gusVar[numVar] = this.dataSource[cat] ; //set object for data

        //2. check and save range for data
        // const min =  parseInt(this[numVar].rawData[0].values[0].year); //find higher year
        // const max =  parseInt(this[numVar].rawData[0].values[this[numVar].rawData[0].values.length - 1].year); //find lower year
        // this[numVar].yearRange = {min, max}

        this.gusVar[numVar] = this.dataSource[cat];
        const min =  parseInt(this.gusVar[numVar].rawData[0].values[0].year); //find higher year
        const max =  parseInt(this.gusVar[numVar].rawData[0].values[this.gusVar[numVar].rawData[0].values.length - 1].year); //find lower year
        this.gusVar[numVar].yearRange = {min, max};

    };

    //transform raw data into data from one year
    getTranformData(numVar){

        //two arrays for chart (labels, and data)
        let labels = []
        let values = []
        
        this.gusVar[numVar].rawData.forEach((region) => {
            //get labels for every region
            labels.push(region.name); 

            //get data for each region for current year with destructuring 
            region.values.forEach(({ year, val }) => {
                if(parseInt(year) == this.barChart.chartConfig.currentYear){
                    values.push(val);
                }
            })
        });

        // //save data to class and sorted by labels
        this.gusVar[numVar].transformedData = { labels, values }  
    }

    //SORT TWO DATA
     sortData(arrLabels, arrDataOne, arrDataTwo, arrDataThree, bySort="one"){
    
        //create object from two arrays
        let arrayOfObj = arrLabels.map(function(d, i) {
            return {
              labels: d,
              valuesOne: arrDataOne[i] || 0,
              valuesTwo: arrDataTwo[i] || 0,
              valuesCombined: arrDataThree[i] || 0
            };
          });
      
        let sortedArrayOfObj
        //sort obj with lodash library
        if(bySort === "first"){
          sortedArrayOfObj = collection.sortBy(arrayOfObj, ['valuesOne']);
        };
        if(bySort === "second"){
          sortedArrayOfObj = collection.sortBy(arrayOfObj, ['valuesTwo']);
        };
        if(bySort === "combined"){
          sortedArrayOfObj = collection.sortBy(arrayOfObj, ['valuesCombined']);
        }

        
        //back two arrays, now sorted first create arrays
        let labels = [];
        let valuesOne = [];
        let valuesTwo = [];
        let valuesCombined = [];

        //second push data to those arrays
        sortedArrayOfObj.forEach(function(d){
            labels.push(d.labels);
            valuesOne.push(d.valuesOne);
            valuesTwo.push(d.valuesTwo);
            valuesCombined.push(d.valuesCombined);
          });
      
        //return data as object with two arrays
        return {labels, valuesOne, valuesTwo, valuesCombined}
    }

    //create data which will be injected into chart.js
    getChartData(bySort='first'){
        //bySort: one, two. by which gusVar sort data 

        //1. SET SORT OPTION TO STATE ONLY FOR FIRST AND SECOND GUSVAR
        if(bySort !== "combined"){
            // this.versusBarChartConfig.versusSort = bySort;
            this.barChart.chartConfig.versusSort = bySort;
        }

        //2. GET COBMINED DATA FROM GUSVARS
        const combinedData = [];
        // this.firstVar.transformedData.values.forEach( (value, index) => {
        //     const combinedValue = Math.round(value / this.secondVar.transformedData.values[index]);
        //     combinedData.push(combinedValue);
        // });

        this.gusVar.firstVar.transformedData.values.forEach( (value, index) => {
            const combinedValue = value / this.gusVar.secondVar.transformedData.values[index];
            combinedData.push(combinedValue);
        });

        //3. SORT BY SELECTED DATA
        const sortedData = this.sortData(
            this.gusVar.firstVar.transformedData.labels, 
            this.gusVar.firstVar.transformedData.values, 
            this.gusVar.secondVar.transformedData.values, 
            combinedData,
            bySort)
    
        //4. SAVE DATA TO STATE 
        this.barChart.data = sortedData;
    }

    //save current year to state
    versusBarChartSetCurrentYear(year){
        this.barChart.chartConfig.currentYear = year;
    }

    //set status needed for chart, show which set of data should be hidden
    versusBarChartSetShowHide(){
    
        this.barChart.chartConfig.hideShow = {
            firstVarHidden: false,
            secondVarHidden: false
        }
    }

    //CHANGE LABELS ACORDING TO CURRENT USER SCREEN SIZE
    versusBarChartChangeLabels(currentLabelsSize){
        
        //1. SAVE CURRENT LABELS AND NEW LABELS
        const currentLabels = this.barChart.data.labels;
        const newLabels = []

        //2. DEPENDS IN WHAT WAY IT IS NECESSERY TO CHANGE LABELS (FROM LONG TO SHORT OR SHORT TO LONG) SAVE LABELS TO CORRECT ARRAYS
        let fromLabels = [];
        let toLabels = [];

        //3. READ FROM ARGUMENT IN WHICH WAY CHANGE WILL BE SONE
        if(currentLabelsSize === "small"){
            fromLabels = this.regionsNames.regionLongNames;
            toLabels = this.regionsNames.regionShortnames;
        }
        if(currentLabelsSize === "big"){
            fromLabels = this.regionsNames.regionShortnames;
            toLabels = this.regionsNames.regionLongNames;
        }

        //4. CREATE NEWLABELS ARRAY
        currentLabels.forEach( label => {
            fromLabels.forEach( (longname, index) =>{
              if(label === longname){
                newLabels.push(toLabels[index]);
              }
          });
        });

        //5. SAVE DATA TO STATE
        this.barChart.data.labels = newLabels;
    };

    //SAVE ACTUAL SCREEN SIZE
    setCurrentScreenSize(){
        //1. READ USER SCREEN SIZE AND SAVE TO STATE
        if(window.innerWidth > 600){
            this.screenSize = "big"
        };

        if(window.innerWidth <= 600){
            this.screenSize = "small"
        };
    };

    //------------------------------------------------------------------------------
    //SCATTER CHART-----------------------------------------------------------------
    //------------------------------------------------------------------------------
    scatterChart__createData(){

        const firstVar = this.gusVar.firstVar.transformedData;
        const secondVar = this.gusVar.secondVar.transformedData;

        //CREATE LABELS FOR SCATTER CHART
        const dataLabels = firstVar.labels;
        
        //CREATE ARRAY WITH DATA FOR SCATTER CHART
        const dataValues = [];
        firstVar.values.forEach( (val, index) =>{
            const tempObj = {};        
            tempObj.x = val;
            tempObj.y = secondVar.values[index];
            // tempObj.r = Math.round(tempObj.x / tempObj.y / 10);
            tempObj.r = tempObj.x / tempObj.y / 10;
            dataValues.push(tempObj);
        })


        //CALCULATE R VALUE - PIXEL SIZE 
        const maxValue = Math.max(...dataValues.map(el => el.r)); //find max value of R values
        dataValues.forEach(el => {
            el.r = this.scatterChart__calcRValues(el.r, maxValue);
        });
            
        return { dataLabels, dataValues};
    }

    scatterChart__calcRValues(currentvalue, maxValue){
        const maxPixels = 30; //SET BIGEST CIRCLE - WILL BE ADDED 2 PIXELX IN CASE OF 0 VALUES
        const perValue = currentvalue / maxValue;
        const finalPixel = Math.round(maxPixels * perValue + 2);

        return finalPixel;
    }
}
