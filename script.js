// ----------------------------
// Grab all DOM elements
// ----------------------------
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const briefInput = document.getElementById('brief');
const moodInput = document.getElementById('mood');
const gratitudeInput = document.getElementById('gratitude');
const accomplishmentsInput = document.getElementById('accomplishments');

const saveBtn = document.getElementById('saveBtn');
const downloadBtn = document.getElementById('downloadBtn');
const message = document.getElementById('message');

// ----------------------------
// Set default date & time to today
// ----------------------------
const now = new Date();
dateInput.value = now.toISOString().split('T')[0]; // YYYY-MM-DD
timeInput.value = now.toTimeString().slice(0,5);    // HH:MM

// ----------------------------
// Save Entry to LocalStorage
// ----------------------------
saveBtn.addEventListener('click', () => {
  // Create entry object
  const entry = {
    date: dateInput.value,
    time: timeInput.value,
    brief: briefInput.value,
    mood: moodInput.value,
    gratitude: gratitudeInput.value,
    accomplishments: accomplishmentsInput.value.split('\n') // split into bullet points
  };

  // Save entry with unique key
  localStorage.setItem(`entry-${Date.now()}`, JSON.stringify(entry));

  // Mood-based message
  let moodMsg = '';
  switch(entry.mood) {
    case 'happy': moodMsg = 'Keep smiling! 😊'; break;
    case 'sad': moodMsg = 'You are doing great, tomorrow is a new day 🌱'; break;
    case 'neutral': moodMsg = 'Another step forward!'; break;
    case 'excited': moodMsg = 'Wow! Keep the energy going! 🚀'; break;
    case 'tired': moodMsg = 'Rest well, you deserve it 🛌'; break;
  }

  // Display message with fade-in/out animation
  message.textContent = moodMsg;
  message.classList.add('show');
  setTimeout(() => message.classList.remove('show'), 3000);

  // Clear textareas
  briefInput.value = '';
  gratitudeInput.value = '';
  accomplishmentsInput.value = '';
});

// ----------------------------
// Download Entry as .txt file
// ----------------------------
downloadBtn.addEventListener('click', () => {
  const entry = {
    date: dateInput.value,
    time: timeInput.value,
    brief: briefInput.value,
    mood: moodInput.value,
    gratitude: gratitudeInput.value,
    accomplishments: accomplishmentsInput.value.split('\n')
  };

  // Format entry as readable text
  const textContent = `
Date: ${entry.date} ${entry.time}
Mood: ${entry.mood}

Daily Brief:
${entry.brief}

Gratitude:
${entry.gratitude}

Accomplishments:
- ${entry.accomplishments.join('\n- ')}
`;

  // Create Blob for text file
  const blob = new Blob([textContent], { type: 'text/plain' });

  // Create temporary link and trigger download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `entry-${entry.date}-${entry.time}.txt`;
  a.click();

  // Release memory
  URL.revokeObjectURL(url);
});
