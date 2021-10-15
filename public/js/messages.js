const buttons = document.querySelectorAll('button.accordion');

buttons.forEach((button, index) => {
    button.style.animation = `smoothAppear 0.3s forwards ${index * 200 + 100}ms`;

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
            button.blur();
        }
    });
});