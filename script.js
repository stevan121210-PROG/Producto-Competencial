// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

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
// Reemplaza este número con tu número de WhatsApp de negocio (incluye código de país, ej: 573001234567)
const BUSINESS_WHATSAPP_NUMBER = '573001234567';

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
    
    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    formMessage.textContent = `¡Redirigiendo a WhatsApp! Gracias ${name} por tu pedido.`;
    formMessage.className = 'form-message success';
    
    // Reset form after a short delay
    setTimeout(() => {
        orderForm.reset();
        formMessage.className = 'form-message';
        formMessage.style.display = 'none';
    }, 3000);
});
