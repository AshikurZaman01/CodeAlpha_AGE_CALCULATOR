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