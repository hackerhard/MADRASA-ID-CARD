// Script to update preview, handle photo upload, download via html2canvas
document.addEventListener('DOMContentLoaded', function(){
  const studentName = document.getElementById('studentName');
  const studentId = document.getElementById('studentId');
  const guardian = document.getElementById('guardian');
  const gender = document.getElementById('gender');
  const address = document.getElementById('address');
  const dob = document.getElementById('dob');
  const blood = document.getElementById('blood');
  const contact = document.getElementById('contact');
  const photoInput = document.getElementById('photoInput');

  const previewName = document.getElementById('previewName');
  const previewId = document.getElementById('previewId');
  const previewGuardian = document.getElementById('previewGuardian');
  const previewGender = document.getElementById('previewGender');
  const previewAddress = document.getElementById('previewAddress');
  const previewDob = document.getElementById('previewDob');
  const previewBlood = document.getElementById('previewBlood');
  const previewContact = document.getElementById('previewContact');
  const photoPreview = document.getElementById('photoPreview');

  function formatDateForPreview(value){
    if(!value) return '05-AUG-2000';
    const d = new Date(value);
    if(isNaN(d)) return value;
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return `${('0'+d.getDate()).slice(-2)}-${months[d.getMonth()]}-${d.getFullYear()}`;
  }

  function updatePreview(){
    previewName.textContent = studentName.value || 'MUHAMMED MURSHID SS';
    previewId.textContent = studentId.value || 'MA 105';
    previewGuardian.textContent = guardian.value || 'SOOPPY MK';
    previewGender.textContent = gender.value || 'MALE';
    previewAddress.textContent = address.value || 'MANICKACHANDI (HO). VALAYANNAOUR...';
    previewDob.textContent = formatDateForPreview(dob.value);
    previewBlood.textContent = blood.value || 'A+ve';
    previewContact.textContent = contact.value || '+91 97781 32141';
  }

  // file reader for photo
  photoInput.addEventListener('change', function(e){
    const file = photoInput.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(ev){
      photoPreview.src = ev.target.result;
    }
    reader.readAsDataURL(file);
  });

  document.getElementById('updateBtn').addEventListener('click', function(e){
    updatePreview();
  });

  document.getElementById('downloadBtn').addEventListener('click', function(e){
    // ensure preview updated
    updatePreview();
    const card = document.getElementById('idCard');
    // remove focus outlines
    html2canvas(card, {scale:2}).then(function(canvas){
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = (studentName.value || 'student') + '_id_card.png';
      a.click();
    });
  });

  document.getElementById('printBtn').addEventListener('click', function(){
    updatePreview();
    const card = document.getElementById('idCard');
    const w = window.open('', '_blank');
    w.document.write('<html><head><title>Print ID Card</title>');
    w.document.write('<style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100vh;background:#fff}</style>');
    w.document.write('</head><body>');
    w.document.write(card.outerHTML);
    w.document.write('</body></html>');
    w.document.close();
    setTimeout(()=>{ w.print(); }, 500);
  });

  // initialize
  updatePreview();
});
