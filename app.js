function calculateAge() {
   clearResults();
   document.getElementById('error').classList.add('hidden');

   const birthDateInput = document.getElementById('birthDate').value;
   const compareCheckbox = document.getElementById('compareCheckbox');
   const compareDateInput = document.getElementById('compareDate').value;
   const futureDateInput = document.getElementById('futureDate').value;
   const timeZone = document.getElementById('timeZone').value;

   if (!birthDateInput) {
      showError('Please enter a birth date');
      return;
   }

   let birthDate = parseDate(birthDateInput, timeZone);
   let targetDate = futureDateInput ? parseDate(futureDateInput, timeZone) : new Date();

   if (compareCheckbox.checked && compareDateInput) {
      targetDate = parseDate(compareDateInput, timeZone);
   }

   if (isNaN(birthDate) || isNaN(targetDate)) {
      showError('Invalid date input');
      return;
   }

   const ageDetails = getAgeDetails(birthDate, targetDate);
   updateDisplay(ageDetails);
}


function parseDate(dateString, timeZone) {
   const date = new Date(dateString);

   if (timeZone === 'UTC') {
      return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
   }

   return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}


function getAgeDetails(birthDate, targetDate) {
   let years = targetDate.getFullYear() - birthDate.getFullYear();
   let months = targetDate.getMonth() - birthDate.getMonth();
   let days = targetDate.getDate() - birthDate.getDate();

   if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
   }

   if (days < 0) {
      const tempDate = new Date(targetDate);
      tempDate.setMonth(targetDate.getMonth() - 1);
      days = Math.floor((targetDate - tempDate) / (1000 * 60 * 60 * 24)) + days;
      months--;
   }

   const timeDiff = targetDate - birthDate;
   return {
      years,
      months,
      days,
      weeks: Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7)),
      hours: Math.floor(timeDiff / (1000 * 60 * 60)),
      minutes: Math.floor(timeDiff / (1000 * 60)),
      seconds: Math.floor(timeDiff / 1000)
   };
}

function updateDisplay(ageDetails) {
   Object.keys(ageDetails).forEach(key => document.getElementById(key).textContent = ageDetails[key].toLocaleString());
}

function clearResults() {
   ['years', 'months', 'days', 'weeks', 'hours', 'minutes', 'seconds'].forEach(id => document.getElementById(id).textContent = '0');
}

function showError(message) {
   const errorDiv = document.getElementById('error');
   errorDiv.textContent = message;
   errorDiv.classList.remove('hidden');
}