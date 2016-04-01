var testCases = ["h2(oa)", "s2j3(k2(ar)m)i", "o2h"]

testCases.forEach(function(testCase) {
  console.log(evalProgram(parseEx(testCase)))
})

function parseEx(str, breakAfterNext) {

  var a = []
  while (str[0] && str[0] != ")") {
    
    if (str[0] == "(") str = str.slice(1)
    
    var exp = createDataNode(str[0])
    a.push(exp)
    
    if (breakAfterNext || exp instanceof Letter) { 
      str = str.slice(1)
      break; 
    }
    // this means its a Multiplier
    var bNext = str[0] != "("
    var subExp = parseEx(str.slice(bNext ? 1 : 2), bNext)
    exp.args = subExp.args
    str = subExp.rest

  }

  if (str[0] == ")") str = str.slice(1)
  return { args: a, rest: str }
}

function evalProgram(o) {
  if (o.rest) console.log("crap")
  return o.args.reduce(function(a,b) {
    if (b instanceof Letter) { a[b.val] = 1 }
    if (b instanceof Multiplier) { 
      var e = evalProgram(b)
      Object.keys(e).forEach(function(key) {
        a[key] = Number(b.val) * (e[key] || 1)
      })
    }
    return a
  }, {})
}

function createDataNode(s) {
  if (s.match(/\d/)) {
    return new Multiplier(s)
  } else if (s.match(/\w/)) {
    return new Letter(s)
  }
}

function Letter(l) {
  this.type = "Letter"
  this.val = l
}

function Multiplier(n) {
  if (!Number(n)) n = Number(n)
  this.args = []
  this.val = n
  this.type = "Multiplier"
}


// example data structure from parseEx(testCases[1])
{  
   "args":[  
      {  
         "type":"Letter",
         "val":"s"
      },
      {  
         "args":[  
            {  
               "type":"Letter",
               "val":"j"
            }
         ],
         "val":"2",
         "type":"Multiplier"
      },
      {  
         "args":[  
            {  
               "type":"Letter",
               "val":"k"
            },
            {  
               "args":[  
                  {  
                     "type":"Letter",
                     "val":"a"
                  },
                  {  
                     "type":"Letter",
                     "val":"r"
                  }
               ],
               "val":"2",
               "type":"Multiplier"
            },
            {  
               "type":"Letter",
               "val":"m"
            }
         ],
         "val":"3",
         "type":"Multiplier"
      },
      {  
         "type":"Letter",
         "val":"i"
      }
   ],
   "rest":""
}