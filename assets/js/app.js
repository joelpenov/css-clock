
(function(){

	var data = {
		currentSeconds: 0,
		currentMinutes: 0,
		currentHours: 0,
		init: function(){
			var self = this;			
			var currentDate = new Date();
			var hour = currentDate.getHours();
			self.currentSeconds = currentDate.getSeconds();
			self.currentHours = hour > 12 ? hour - 12 : hour;
			self.currentMinutes = currentDate.getMinutes();
		}
	}

	function ClockViewModel(view){
		var self = this;

		self.init = function(){
			data.init();
			self.setClockIntervalUpdater();		
			self.initializarClock();	
		};

		self.initializarClock = function(){
			view.rotateHours(self.calculateRotation(data.currentHours));
			view.rotateMinutes(self.calculateRotation(data.currentMinutes));
			view.rotateSeconds(self.calculateRotation(data.currentSeconds));
		}

		self.calculateRotation = function(currentTimeDistance){
			var fullHandCycle = 360 + 90;
			var result = 90 + (currentTimeDistance * 6);
			return result === fullHandCycle ? 90 : result;
		}

		self.getNextTimeUnit = function(currentTimeUnit){
			var maxUnitTimeValue = 59;
			return currentTimeUnit < maxUnitTimeValue ? currentTimeUnit + 1 : 0;
		}

		self.setClockIntervalUpdater = function(){
			var milisecondsEach = 1000;
			window.setInterval(function(){
				data.currentSeconds = self.getNextTimeUnit(data.currentSeconds);
				if(data.currentSeconds === 0){
					data.currentMinutes = self.getNextTimeUnit(data.currentMinutes);
				}
				if(data.currentMinutes === 0){
					data.currentHours = self.getNextTimeUnit(data.currentHours);
				}
				view.rotateSeconds(self.calculateRotation(data.currentSeconds));
				view.rotateMinutes(self.calculateRotation(data.currentMinutes));
				view.rotateHours(self.calculateRotation(data.currentHours));
			}, milisecondsEach);
		}
	};

	function ClockView(){

		var self = this;

		self.minutesHandElement = document.getElementById("minutes-hand");
		self.hoursHandElement = document.getElementById("hours-hand");
		self.secondsHandElement = document.getElementById("seconds-hand");

		self.rotateHand = function(element, grades){
			element.style["transform"] = "rotate("+grades+"deg)";
		}

		self.rotateSeconds = function(grades){
  			self.rotateHand(self.secondsHandElement, grades);
  		}

  		self.rotateMinutes = function(grades){
  			self.rotateHand(self.minutesHandElement, grades);
  		}

  		self.rotateHours = function(grades){
  			self.rotateHand(self.hoursHandElement, grades);
  		}
	};

	document.addEventListener('DOMContentLoaded', function() {
		var controller = new ClockViewModel(new ClockView());
		controller.init();
	});
})();