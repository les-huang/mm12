function getFrequencyByKey(data, str, splitter="::", index = 0) {
  let map = new Map();
  for (var i = 0; i < data.length; i++) {
      let key = data[i][str].split(splitter)[index];
      // let key = data[i][str];
      if (!map.has(key)) {
          map.set(key, 1);
      } else {
          map.set(key, map.get(key) + 1);
      }
  }

  let sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
  return sortedMap;
}

function getYearTotal(data) {
  let map = {};
  for(var i = 0; i < data.length; i++) {
    let year = Number(data[i]["Month"].split("/")[2]);

    if (year > 2009) {
      let category = data[i]["Category"];

      // check for missing key 
      if (!(category in map)) {
        map[category] = {};
      } 

      if (!(year in map[category])) {
        map[category][year] = 0;
      }
      
      map[category][year] += Number(data[i]["Millions of Dollars"]);
    }
  }
  return map;
}

function generateAllRank(data) {
  let rankings = {};
  for (var year = 2010; year < 2021; year++) {
    rankings[year] = generateRank(data, year);
  }
  return rankings;
}

function generateRank(data, year) {
  let map = new Map();

  for (var cat of Object.keys(data)) {
    map.set(cat, data[cat][year]);
  }

  let sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
  console.log(sortedMap)
  let rankings = {};
  let counter = 0;
  for (var cat of sortedMap.keys()) {
    rankings[cat] = counter;
    counter = counter+1;
  }
  return rankings;
}