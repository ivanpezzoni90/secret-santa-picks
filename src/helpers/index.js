
const testSecretSantaResults = (picks, exceptions) => {
  const names = Object.keys(picks);
  const errors = [];
  names.forEach((n)=> {
    // Test self pick
    if (n === picks[n]) {
      errors.push(`Error: ${n} is self pick`);
    }
    // Test exceptions
    if (exceptions[n].some(e => e === picks[n])) {
      errors.push(`Error: ${n} has for pick ${picks[n]}, one of his exceptions`);
    }
  });
  if (errors.length > 0) {
    alert('There are pick errors');
    console.log('Errors', errors);
    return false;
  }
  return true;
};

const getMostSelective = (list, exceptions) => {
  let mostSelective = list[0];
  let mostExceptions = -1;
  list.forEach((n, i) => {
    const e = exceptions[list[i]];
    // TODO: Verificare se controllare e oppure e.length !== 0
    if (e) {
      const numExceptions = e.length;
      if (numExceptions > mostExceptions) {
        mostExceptions = numExceptions;
        mostSelective = list[i];
      }
    }
  })
  return mostSelective;
};

const makePicks = (namesList, exceptions) => {
  const picks = [];
  let namesInHat = namesList.slice(0);
  let pickers = namesList.slice(0);
  while (pickers.length > 0) {
      // who is the most selective picker remaining?
      const mostSelective = getMostSelective(pickers, exceptions);
       pickers = pickers.filter((e) => {
         return e !== mostSelective;
        });
 
      // which of the remaining names can be picked by this person?
      let possiblePicks = namesInHat.slice(0);
      possiblePicks = possiblePicks.filter(e => {
        if (e === mostSelective) return false;
        var ex = exceptions[mostSelective];
        if (ex == null) return true;
        return (ex.indexOf(e) === -1);
      });

      if (possiblePicks.length === 0) {
          return null;
      }
      // pick one and remove it from the hat
      const pickedName = possiblePicks[Math.floor(Math.random() * possiblePicks.length)];
      namesInHat = namesInHat.filter(e => e !== pickedName);
   
      picks[mostSelective] = pickedName;
  }
  return picks;
};

export const generateSanta = (addressMap, exceptions) => {  
  const namesList = Object.keys(addressMap);
  const picks = makePicks(namesList, exceptions);

  if(picks === null) {
    alert("WARNING! CONSTRAINTS TOO HIGH, IT IS NOT POSSIBLE TO DRAW PICKS");
    return {};
  } else {
    if (testSecretSantaResults(picks, exceptions)) {
      return picks;
    }
  }
};