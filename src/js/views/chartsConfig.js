//COLORS PALLETE
export const colors = {
  colorOne: '#273c75',
  colorTwo: '#e1b12c',
  colorThree: '#e84118',
  colorMixTwoThree: "#E57922",
  colorFour: '#7f8fa6',

  colorBlack: '#000',
  colorWhite: '#fff'
};

//CREATE OPTIONS BASE ON CURRENT CHART CONFIGURATION 
export const createOptionsVersusBarChart = ( {firstVarHidden , secondVarHidden} ) => {

  const options = {
    maintainAspectRatio: false,
    legend: { display: false},
    scales: {
      yAxes: [{
        ticks: {
          fontFamily: 'Alegreya Sans SC',
          fontColor: colors.colorTwo
        },
        gridLines: {
          display: false,
          color: colors.colorFour,
          borderDash: [2,2]
        }
      }
    ],
      xAxes:[{
        display: !firstVarHidden,
        id:"valuesOne",
        position: 'bottom',
        ticks: {
          fontFamily: 'Alegreya Sans SC',
          fontColor: colors.colorTwo
        },
        gridLines: {
          color: colors.colorFour,
          borderDash: [3,3]
        }
      }
      ,
      {
        display: !secondVarHidden,
        id:"valuesTwo",
        position: 'top',
        type: 'linear', //necessery for second XAXIS for horizontal bar
        ticks: {
          fontFamily: 'Alegreya Sans SC',
          fontColor: colors.colorTwo
        },
        gridLines: {
          color: colors.colorFour,
          borderDash: [3,3]
        }
      }
    ]
    }
  
  };

  return options

}

//OPTIONS FOR DENSITY 
export const optionsCombined = {
  maintainAspectRatio: false,
  legend: { display: false},
  scales: {
    yAxes: [{
      ticks: {
        fontFamily: 'Alegreya Sans SC',
        fontColor: colors.colorTwo
      },
      gridLines: {
        display: false,
        color: colors.colorFour,
        borderDash: [2,2]
      }
    }
  ],
    xAxes:[{
      position: 'bottom',
      ticks: {
        fontFamily: 'Alegreya Sans SC',
        fontColor: colors.colorTwo
      },
      gridLines: {
        color: colors.colorFour,
        borderDash: [3,3]
      }
    }
  ]
  }
};


export const createOptionScatterChart = ({firstVarName, secondVarName}) => {

  const options = {
      // plugins: {
      //   datalabels: {
      //     formatter: function(value, context) {
      //       return context.chart.data.labels[context.dataIndex];
      //     },
      //     color: "#fff"
      //   }
      // },
      maintainAspectRatio: false,
      legend: { display: false},
      scales: {
        yAxes: [{
          scaleLabel:{
            display: true,
            labelString: secondVarName,
            fontFamily: 'Alegreya Sans SC',
            fontColor: colors.colorTwo
          },
          ticks: {
            fontFamily: 'Alegreya Sans SC',
            fontColor: colors.colorTwo
          },
          gridLines: {
            display: true,
            color: colors.colorFour,
            borderDash: [3,3]
          }
        }
      ],
        xAxes:[{
          scaleLabel:{
            display: true,
            labelString: firstVarName,
            fontFamily: 'Alegreya Sans SC',
            fontColor: colors.colorTwo
          },
          ticks: {
            fontFamily: 'Alegreya Sans SC',
            fontColor: colors.colorTwo
          },
          gridLines: {
            color: colors.colorFour,
            borderDash: [3,3]
          }
        }]
      },
      tooltips : {
        callbacks: {
          label: function(t, data){
            // return `${data.labels[t.index]} Ludnośc: ${t.xLabel}, Pow km2: ${t.yLabel}) `
            return `${data.labels[t.index]} Ludnośc: ${data.datasets[0].data[t.index].x} Pow km2: ${data.datasets[0].data[t.index].y}`
          }
        }
      }
  };

  return options
};

//only to check options in chart.js
const optionsHelp = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      onClick: ()=>{alert("CLICK")},
      reverse: false,
      labels: {
        boxWidth: 10,
        fontSize: 15,
        // fontColor: colorOrange,
        fontStyle: 'italic',
        fontFamily: 'Helvetica',
        padding: 20,
        usePointStyle: true}
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        right: 10,
        left: 1
      }
    },
    title: {
      text: "Chart in JS",
      display: true,
      position: 'top',
      fontSize: 30,
      fontFamily: 'Helvetica',
      // fontColor: colorOrange,
      fontStyle: 'italic',
      padding: 10,
      lineHeight: 1.2
    },
    scales: {
      yAxes: [{
        type: 'linear',
        position: 'left',
        id: 'Num',
        gridLines: {
          display: true,
          color: 'rgba(255,255,255, .5)',
          borderDash: [10,10],
          borderDashOffset: 5,
          lineWidth: 1,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: false,
          // zeroLineColor: colorYellow
        },
        ticks: {
          display: true,
          min:0,
          max: 25,
          maxRotation: 15,
          minRotation: 15,
          autoskip: false,
          beginAtZero: true,
          // fontColor: colorYellow,
          fontFamily: 'Helvetica',
          fontSize: 15,
          fontStyle: 'italic',
          lineHeight: 1.2,
          reverse: false,
          padding: 10,
          minor: {
            //CHECK LATER
          },
          major: {
            //CHECK LATER
          }
              }
          }],
      xAxes: [{
        position: 'bottom',
        gridLines : {
          color: 'rgba(255,255,255, .5)',
          borderDash: [10,10]
        },
        ticks: {
          min: 0,
          max: 25,
          // fontColor: colorYellow,
          fontFamily: 'Helvetica',
          fontSize: 15,
          fontStyle: 'italic',
          padding: 10
        }
      }]
      },
    animation: {
      duration: 1000,
      easing: 'linear',
      onComplete: function(end){
         console.log("End updating");
      }
    },
    tooltips: {
      enabled: true,
      mode: 'nearest',
      // backgroundColor: colorOrange ,
      positon: 'average',
      titleFontFamily: 'Helvetica',
      titleFontSize: 20,
      titleFontStyle: 'italic',
      titleFontColor: '#000',
      titleSpacing: 10,
      titleMarginBottom: 20,
      bodyFontFamily: 'Helvetica',
      bodyFontSize: 15,
      bodyFontStyle: 'italic',
      bodyFontColor: '#000',
      bodySpacing: 10,
      cornerRadius: 15,
      borderWidth: 2,
      // borderColor: colorYellow 
    }
  };
  