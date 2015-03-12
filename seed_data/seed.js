require('dotenv').load();
var bonfires = require('./bonfires.json'),
    app = require('../server/server'),
    Bonfire = app.models.Bonfire,
    coursewares = require('./coursewares.json'),
    unfinishedCoursewares = require('./unfinishedCoursewares.json'),
    Courseware = app.models.Courseware;
    Nonprofit = app.models.Nonprofit,
    nonprofits = require('./nonprofits.json');

var counter = 0;
var offerings = 2;

if (process.env.NODE_ENV !== 'production') {
  offerings++;
}

var CompletionMonitor = function() {
    counter++;
    console.log('call ' + counter);

    if (counter < offerings) {
        return;
    } else {
        process.exit(0);
    }
};

Bonfire.destroyAll({}, function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log('Deleted ', data);
    }
    Bonfire.create(bonfires, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Saved ', data);
        }
        CompletionMonitor();
    });
    console.log('bonfires');
});

Courseware.destroyAll({}, function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log('Deleted ', data);
    }
    Courseware.create(coursewares, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Saved ', data);
        }
        CompletionMonitor();
    });
  if (process.env.NODE_ENV !== 'production') {
    Courseware.create(unfinishedCoursewares, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('Saved ', data);
      }
      CompletionMonitor();
    });
  }
  console.log('coursewares');
});

