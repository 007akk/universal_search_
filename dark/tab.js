  function updateClock() {
    Date.getMinutesTwoDigits = function() {
      var retval = now.getMinutes();
      if (retval < 10) return ("0" + retval.toString());
      else return retval.toString();
    }
    Date.getHoursModTwelve = function() {
      var retval = now.getHours();
      
      return retval;
    }
    var now = new Date(),
        time = Date.getHoursModTwelve() + ':' + Date.getMinutesTwoDigits();
    document.getElementById('time').innerHTML = ["", time].join('');
    setTimeout(updateClock, 1000);
  }

  function addSearch(elementId, callback) {
    var elem = document.getElementById(elementId);
    elem.addEventListener('keypress', function(evt) {
      if (evt.keyCode == 13) {
        callback(elem.value);
      } 
    },true);
  }

  function _makeDelayed() {
    var timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  }

  function bindNoteHandlers() {
    var elem = document.getElementById('noteText'),
        saveHandler = _makeDelayed();
    function save() {
      chrome.storage.sync.set({'noteText': elem.value});
    }
    // Throttle save so that it only occurs after 1 second without a keypress.
    elem.addEventListener('keypress', function() {
      saveHandler(save, 1000);
    });
    elem.addEventListener('blur', save);
    chrome.storage.sync.get('noteText', function(data) {
      elem.value = data.noteText ? data.noteText : '';
    });
  }




  addSearch('searchgoogle', function(s) {
    window.location.href = 'https://www.google.com/#q=' + s;
  });
	addSearch('search', function(s) {
    window.location.href = 'https://www.bing.com/#q=' + s;
  });
	
  addSearch('subreddit', function(s) {
    window.location.href = 'http://www.reddit.com/r/' + s;
  });
  addSearch('issue', function(s) {
    window.location.href = 'https://github.com/search?utf8=%E2%9C%93&q=' + s + '&type=';
  });
  addSearch('weather', function(s) {
    window.location.href = 'http://www.wunderground.com/cgi-bin/findweather/getForecast?query=' + s;
  });
  addSearch('testp', function(s) {
    window.location.href = 'https://youtube.com/results?search_query=' + s;
  });
  addSearch('playground', function(s) {
    window.location.href = 'https://wikipedia.com/wiki/' + s;
  });
	addSearch('quora', function(s) {
    window.location.href = 'https://quora.com/search?q=' + s;
  });
	addSearch('duckduck', function(s) {
    window.location.href = 'https://duckduckgo.com/?q=' + s;
  });
	addSearch('yahoo', function(s) {
    window.location.href = 'https://yahoo.com/?q=' + s;
  });

  updateClock();
  bindNoteHandlers();

