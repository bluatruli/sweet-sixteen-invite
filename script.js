document.addEventListener("DOMContentLoaded", () => {
    const cover = document.getElementById("cover");
    const envelopeView = document.getElementById("envelope-view");
    const invitationView = document.getElementById("invitation-view");

    envelopeView.addEventListener("click", () => {
        envelopeView.classList.add("open");

        setTimeout(() => {
            envelopeView.classList.add("hidden");

            invitationView.classList.remove("hidden");

            setTimeout(() => {
                invitationView.classList.add("visible");
            }, 50);
            
        }, 600);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    const hiddenElements = document.querySelectorAll('.fade-in-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- APPLE CALENDAR (.ICS) GENERATOR ---
const calendarBtn = document.getElementById('calendar-btn');

if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Edalyn Rose Vega Sweet Sixteen//EN
BEGIN:VEVENT
UID:sweet16-edalynevega@invitation.com
DTSTAMP:20260101T000000Z
DTSTART:20261123T010000Z
DTEND:20261123T050000Z
SUMMARY:Edalyn Rose Vega's Sweet Sixteen
LOCATION:636 Broadway\, Chula Vista\, CA 91910
DESCRIPTION:Sweet Sixteen celebration for Edalyn Rose Vega.\nRSVP to Heidy: (619) 247-8224
END:VEVENT
END:VCALENDAR`;

            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) || 
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);;

            if (isIOS) {
                window.location.href = "data:text/calendar;charset=utf8," + encodeURIComponent(icsContent);
            } else {
                const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'Vega_Baby_Shower.ics'; 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    }
});
