import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.plugins.unregister(ChartDataLabels);
import { htmlElements } from './base'
import {  colors, optionsVersusBarChart, optionsCombined, createOptionsVersusBarChart, createOptionScatterChart } from './chartsConfig'
// import collection from 'lodash'


//RENDER CHART WITH TWO GUSVARS
export const versusBarChartRender = ( { labels, valuesOne, valuesTwo }, state, {firstVarHidden, secondVarHidden}, currentVarNames) => {

  //render chart for population basic 
  if(state.gusApi.barChart.chart == undefined){
    //if chart not exist create

    //1. CREATE OPTIONS PASS INFO IF VARS SHOULD BE HIDDEN OR NOT - BELOW FUNCTION HIDE AXIS 
    const options = createOptionsVersusBarChart({firstVarHidden, secondVarHidden}, currentVarNames);
  
    //2. CREATE DATA
    const data = {
          labels: labels,
          datasets: [
            {
              hidden: firstVarHidden,
              xAxisID: 'valuesOne',
              data: valuesOne,
              backgroundColor: colors.colorTwo,
              borderWidth: 1,
            },
            {
              hidden: secondVarHidden,
              xAxisID: 'valuesTwo',
              data: valuesTwo,
              backgroundColor: colors.colorThree,
              borderWidth: 1,
            }
      ]}
  
    //2. GET HTML OBJECT TO PUT CHART
      const ctx = htmlElements.charts.versusBarChart; 
  
    //3. CREATE CHART
      state.gusApi.barChart.chart = new Chart(ctx, {
          type: 'horizontalBar',
          data: data,
          options: options
        });
        
  }else{

    //1. CREATE NEW DATA OBJ FOR VERSUS DATA
    const data = {
      labels: labels,
      datasets: [
        {
          hidden: firstVarHidden,
          xAxisID: 'valuesOne',
          data: valuesOne,
          backgroundColor: colors.colorTwo,
          borderWidth: 1
        },
        {
          hidden: secondVarHidden,
          xAxisID: 'valuesTwo',
          data: valuesTwo,
          backgroundColor: colors.colorThree,
          borderWidth: 1,
        }
      ]}

    //2. ADD NEW DATA TO CHART
    state.gusApi.barChart.chart.data = data

    //3. GET OPTIONS FOR THIS CHART
    state.gusApi.barChart.chart.options = createOptionsVersusBarChart({firstVarHidden, secondVarHidden}, currentVarNames);

    // 4. UPDATE DATA
    state.gusApi.barChart.chart.update();
  };

};

//RENDER CHART WITH COMBINED DATA
export const versusBarChartShowCombined = ({labels, valuesCombined}, state) => {


  //1. CREATE NEW DATA OBJ FOR COMBINED DATA
  const data = {
    labels: labels,
    datasets: [
      {
        data: valuesCombined,
        backgroundColor: colors.colorMixTwoThree,
        borderWidth: 1,
      }
    ]}

  //2. ADD NEW DATA TO CHART
  state.gusApi.barChart.chart.data = data;

  //3. GET OPTIONS FOR THIS CHART
  state.gusApi.barChart.chart.options = optionsCombined;

  //4. UPDATE DATA
  state.gusApi.barChart.chart.update();

};

//SHOW OR HIDE ONE OF GUSVARS
export const versusBarChartShowHide = ({ labels, valuesOne, valuesTwo }, state) => {


  const data = {
    labels: labels,
    datasets: [
      {
        hidden: false,
        xAxisID: 'valuesOne',
        data: valuesOne,
        backgroundColor: colors.colorTwo,
        borderWidth: 1,
      },
      {
        hidden: false,
        xAxisID: 'valuesTwo',
        data: valuesTwo,
        backgroundColor: colors.colorThree,
        borderWidth: 1,
      }
]}


};


//RENDER SCATTER SCHART
export const scatterChartRender = ( {dataLabels , dataValues}, currentVarNames, scatterChart ) =>{

  if(scatterChart === undefined){
    const options = createOptionScatterChart(currentVarNames);
    
    const data = {
        labels: dataLabels,
        datasets: [{
          label: 'Scatter Dataset',
          data: dataValues,
          backgroundColor: colors.colorMixTwoThree,
          hoverRadius: 0
      }],
    };

    //2. GET HTML OBJECT TO PUT CHART
    const ctx = htmlElements.charts.scatterChart; 
    
    //3. CREATE CHART
      return new Chart(ctx, {
        // plugins: [ChartDataLabels],
        type: 'bubble',
        data: data,
        options: options
      });
  }else{

      //1. CREATE DATA
      const data = {
        labels: dataLabels,
        datasets: [{
          label: 'Scatter Dataset',
          data: dataValues,
          backgroundColor: colors.colorMixTwoThree,
          hoverRadius: 0
        }],
      };

       //2. ADD NEW DATA TO CHART
      scatterChart.data = data;

      //3. GET OPTIONS FOR THIS CHART
      scatterChart.options = createOptionScatterChart(currentVarNames);

      //4. UPDATE DATA
      scatterChart.update();

      return scatterChart;
  }
}