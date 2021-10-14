document.querySelectorAll('button.accordion').forEach(button => {
    button.addEventListener('click', async () => {
        button.classList.toggle('active');
        
        if (button.classList.contains('unread')) {
            let res = await fetch(`${window.location.href}/${button.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead: true })
            });

            if (res.status === 200) {
                button.classList.remove('unread');
            }
        }

        const panel = button.nextElementSibling;

        if (button.classList.contains('active')) {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
        } else {
            panel.style.maxHeight = null;
        }
    });
});