document.querySelectorAll('table tr').forEach((row, index) => {
    row.style.transition = `opacity 0.3s ease-in ${index * 100}ms`;
    row.style.opacity = 1;
});