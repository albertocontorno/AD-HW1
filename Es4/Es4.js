/* single temporal istant structure
temporalInstant = [
  {type: '', outsourceCost: ''} //job structure
]
*/

temporalInstants = [
  [{type:"2", outsourceCost: 25}],
  [
    {type:"1", outsourceCost: 10},
    {type:"2", outsourceCost: 50},
  ],
  [
    {type:"1", outsourceCost: 4 },
  ],
  [],
  [],
  [
    {type:"1", outsourceCost: 20},
  ],
  [],
  [
    {type:"1", outsourceCost: 15},
    {type:"2", outsourceCost: 20},
  ],
  [
    {type:"1", outsourceCost: 2},
  ],
  []
]
costs = { hiring: 5 , firing: 7, salary: 11 }


function getFreelancerCost(instant, jobToFind){
  let job = temporalInstants[instant].find( job => 
                                      job.type == jobToFind.type);
  return job ? job.outsourceCost : 0;
}

function getFreelanceTotalCost(instant){
  let totalCost = temporalInstants[instant].length > 0 ? 0 : null;
  temporalInstants[instant].forEach( job =>{
    totalCost += getFreelancerCost(instant, job);
  });

  return totalCost;
}

function computeBestConfigurationsPerInstant(instant, bestConfigurationsPerInstant, temporalInstants, costs){
  let configurationForNextInstant = [];

  let minCostConfigurationHired;
  let minCostConfigurationNotHired;

  let {hiring, firing, salary} = costs; 
  console.log('\n')
  if(instant == 0){
    //if we have no jobs
    if(temporalInstants[instant]  == false){// [] is equals to false in JS!
      configurationForNextInstant.push({hired: false, costAtInstant: 0});
    } else { //we have at least one job
      let hirePlusSalaryCost = hiring + salary;
      let outsorceCost = getFreelanceTotalCost(instant);
      configurationForNextInstant.push({hired: true, costAtInstant: hirePlusSalaryCost});
      configurationForNextInstant.push({hired: false, costAtInstant: outsorceCost});
    }
  } else {
    console.log('best configurations at previous instant',(JSON.stringify(bestConfigurationsPerInstant[instant])));
    for(let i=0; i<bestConfigurationsPerInstant[instant].length; i++){
      let previousConfCost = bestConfigurationsPerInstant[instant][i].costAtInstant;
      if(bestConfigurationsPerInstant[instant][i].hired){//case we have an hired employee at instant-1 
        if(temporalInstants[instant] == false){//if we have no jobs
          let keepEmployeeCost = salary;
          let fireEmployeeCost = firing;

          if(minCostConfigurationHired == null){
            minCostConfigurationHired = {hired: true, costAtInstant: keepEmployeeCost + previousConfCost}
          } else if(minCostConfigurationHired.costAtInstant > keepEmployeeCost + previousConfCost){
            minCostConfigurationHired = {hired: true, costAtInstant: keepEmployeeCost + previousConfCost};
          }

          if(minCostConfigurationNotHired == null){
            minCostConfigurationNotHired = {hired: false, costAtInstant: fireEmployeeCost + previousConfCost}
          } else if(minCostConfigurationNotHired.costAtInstant > fireEmployeeCost + previousConfCost){
            minCostConfigurationNotHired = {hired: false, costAtInstant: fireEmployeeCost + previousConfCost};
          }
          
        } else {//if we have some jobs
          let keepEmployeeCost = salary;
          let fireAndGetFreelanceCost = firing + getFreelanceTotalCost(instant);

          if(minCostConfigurationHired == null){
            minCostConfigurationHired = {hired: true, costAtInstant: keepEmployeeCost + previousConfCost}
          } else if(minCostConfigurationHired.costAtInstant > keepEmployeeCost + previousConfCost){
            minCostConfigurationHired = {hired: true, costAtInstant: keepEmployeeCost + previousConfCost};
          }

          if(minCostConfigurationNotHired == null){
            minCostConfigurationNotHired = {hired: false, costAtInstant: fireAndGetFreelanceCost + previousConfCost}
          } else if(minCostConfigurationNotHired.costAtInstant > fireAndGetFreelanceCost + previousConfCost){
            minCostConfigurationNotHired = {hired: false, costAtInstant: fireAndGetFreelanceCost + previousConfCost};
          }

        }
      } else {//case we don't have an hired employee at instant-1
        if(temporalInstants[instant]  == false){//if we have no jobs

          if(minCostConfigurationNotHired == null){
            minCostConfigurationNotHired = {hired: false, costAtInstant: previousConfCost}
          } else if(minCostConfigurationNotHired.costAtInstant > previousConfCost){
            minCostConfigurationNotHired = {hired: false, costAtInstant: previousConfCost};
          }
          
        } else {//if we have some jobs
          let hirePlusSalaryCost = hiring + salary;
          let outsourceCost = getFreelanceTotalCost(instant);

          if(minCostConfigurationHired == null){
            minCostConfigurationHired = {hired: true, costAtInstant: hirePlusSalaryCost + previousConfCost}
          } else if(minCostConfigurationHired.costAtInstant > hirePlusSalaryCost + previousConfCost){
            minCostConfigurationHired = {hired: true, costAtInstant: hirePlusSalaryCost + previousConfCost};
          }

          if(minCostConfigurationNotHired == null){
            minCostConfigurationNotHired = {hired: false, costAtInstant: outsourceCost + previousConfCost}
          } else if(minCostConfigurationNotHired.costAtInstant > outsourceCost + previousConfCost){
            minCostConfigurationNotHired = {hired: false, costAtInstant: outsourceCost + previousConfCost};
          }

        }
      }
    }//end for

    configurationForNextInstant.push(minCostConfigurationHired);
    configurationForNextInstant.push(minCostConfigurationNotHired);
  }

  bestConfigurationsPerInstant.push(configurationForNextInstant);
}

function computeTotalBestCost(temporalInstants, costs){
  /* configuration per instant obj
    {hiredEmplyee: true, costAtIstant: 12 }
  */
  let bestConfigurationsPerInstant = [];
  bestConfigurationsPerInstant.push([]);
  temporalInstants.forEach( (jobs, index) => {
    if(index < temporalInstants.length){
      console.log(`Computing best configuration for instant ${index}`);
      computeBestConfigurationsPerInstant(index, bestConfigurationsPerInstant,temporalInstants, costs);
    }
  });

  let indexLastConf = temporalInstants.length - 1;

  let optimalCost = bestConfigurationsPerInstant[indexLastConf][0].costAtInstant || 9999999;
  bestConfigurationsPerInstant[indexLastConf].forEach(
    configuration => {
      if( configuration.costAtInstant < optimalCost){
        optimalCost = configuration.costAtInstant;
      }
  });

  console.log(`Optimal cost is = ${optimalCost}`);
}

computeTotalBestCost(temporalInstants, costs);