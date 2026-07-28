// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    const toggleMenu = () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleMenu);
    // Allow keyboard activation
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menu card scroll animations
const menuCards = document.querySelectorAll('.menu-card');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

menuCards.forEach(card => {
    observer.observe(card);
});

// Order form submission with WhatsApp integration
const orderForm = document.getElementById('orderForm');
const formMessage = document.getElementById('formMessage');
// Números de WhatsApp de destino (Colombia +57)
const BUSINESS_WHATSAPP_NUMBERS = ['573027473875', '573054454502'];

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(orderForm);
    const name = formData.get('name');
    const whatsapp = formData.get('whatsapp');
    const course = formData.get('course');
    const productValue = formData.get('product');
    const quantity = formData.get('quantity');
    
    // Map product value to name
    let productName;
    switch (productValue) {
        case 'especial':
            productName = 'Rollo Especial ($12.000 COP)';
            break;
        case 'clasico':
            productName = 'Rollo Clásico ($10.000 COP)';
            break;
        case 'ambos':
            productName = 'Ambos Rollos';
            break;
        default:
            productName = 'No especificado';
    }
    
    // Create WhatsApp message
    const message = `Hola Shinsushii! 🍣\n\nNuevo pedido:\n👤 Nombre: ${name}\n📱 WhatsApp: ${whatsapp}\n🏫 Curso: ${course}\n🍣 Producto: ${productName}\n🔢 Cantidad: ${quantity}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    // Validación básica del número de WhatsApp (colombiano sin +57)
    const phoneRegex = /^3\d{9}$/;
    if (!phoneRegex.test(whatsapp)) {
        formMessage.textContent = 'Por favor ingresa un número móvil colombiano válido (10 dígitos, iniciando en 3).';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
    }

    // Disable submit to avoid múltiples envíos
    const submitButton = orderForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    // Open WhatsApp links for each business number (intenta enviar a ambos destinatarios)
    BUSINESS_WHATSAPP_NUMBERS.forEach((num) => {
        const whatsappUrl = `https://wa.me/${num}?text=${encodedMessage}`;
        const win = window.open(whatsappUrl, '_blank');
        if (win) win.opener = null;
    });

    // Show success message
    formMessage.textContent = `¡Redirigiendo a WhatsApp! Gracias ${name} por tu pedido.`;
    formMessage.className = 'form-message success';
    formMessage.style.display = 'block';
    
    // Reset form after a short delay
    setTimeout(() => {
        orderForm.reset();
        formMessage.className = 'form-message';
        formMessage.style.display = 'none';
        if (submitButton) submitButton.disabled = false;
    }, 3000);
});
