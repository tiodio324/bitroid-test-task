document.addEventListener('DOMContentLoaded', function() {
    window.dateChanged = function(selectedDate) {
        console.log('Выбрана дата:', selectedDate);
        filterEventsByDate(selectedDate);
    };

    function filterEventsByDate(date) {
        const events = document.querySelectorAll('.events__card');
        console.log(`Фильтрация ${events.length} мероприятий по дате: ${date}`);
    }

    const checkboxes = document.querySelectorAll('.filters__checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateActiveFilters();
        });
    });

    function updateActiveFilters() {
        const checkedFilters = document.querySelectorAll('.filters__checkbox:checked');
        console.log(`Активно фильтров: ${checkedFilters.length}`);
        
        const activeFiltersContainer = document.querySelector('.active-filters__list');
        if (activeFiltersContainer) {
        }
    }

    const newsTabs = document.querySelectorAll('.news__filter-tab');
    newsTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            newsTabs.forEach(t => t.classList.remove('news__filter-tab--active'));
            
            this.classList.add('news__filter-tab--active');
            
            const category = this.textContent.trim();
            loadNewsCategory(category);
        });
    });

    function loadNewsCategory(category) {
        console.log(`Загружаем новости категории: ${category}`);
    }

    const paginationButtons = document.querySelectorAll('.hero__nav');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isPrev = this.classList.contains('hero__nav--prev');
            const isNext = this.classList.contains('hero__nav--next');
            
            if (isPrev) {
                console.log('Предыдущая страница');
            } else if (isNext) {
                console.log('Следующая страница');
            }
        });
    });

    let currentSlide = 0;
    const heroSlider = document.querySelector('.hero-slider');
    
    if (heroSlider) {
        const prevBtn = heroSlider.querySelector('.hero__nav--prev');
        const nextBtn = heroSlider.querySelector('.hero__nav--next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide = Math.max(0, currentSlide - 1);
                updateHeroSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentSlide = currentSlide + 1;
                updateHeroSlide();
            });
        }
    }

    function updateHeroSlide() {
        console.log(`Текущий слайд: ${currentSlide}`);
    }

    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            calendarDays.forEach(d => {
                d.classList.remove('calendar-day--active');
                d.classList.remove('calendar-day--selected');
            });
            
            this.classList.add('calendar-day--selected');
            
            const selectedDate = this.textContent.trim();
            console.log(`Выбран день: ${selectedDate}`);
            
            filterEventsByDate(selectedDate);
        });
    });

    const filterRemoveButtons = document.querySelectorAll('.active-filters__tag-remove');
    filterRemoveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filterTag = this.closest('.active-filters__tag');
            if (filterTag) {
                filterTag.remove();
                updateActiveFilters();
            }
        });
    });

    const resetFiltersBtn = document.querySelector('.active-filters__reset');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            const activeFilters = document.querySelectorAll('.active-filters__tag:not(.active-filters__reset)');
            activeFilters.forEach(filter => filter.remove());
            
            console.log('Фильтры сброшены');
            updateActiveFilters();
        });
    }

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    const searchForm = document.querySelector('.header__search');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.header__search-input');
            const query = searchInput.value.trim();
            
            if (query) {
                console.log(`Поиск: ${query}`);
                performSearch(query);
            }
        });
    }

    function performSearch(query) {
        console.log(`Выполняется поиск по запросу: ${query}`);
    }

    console.log('Культурный портал загружен');
});

window.alpineData = {
    mobileMenu: {
        isOpen: false,
        toggle() {
            this.isOpen = !this.isOpen;
        }
    },

    heroSlider: {
        currentSlide: 0,
        totalSlides: 3,
        next() {
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        },
        prev() {
            this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.totalSlides - 1;
        }
    },

    filters: {
        selectedVenues: [],
        selectedCategories: [],
        selectedDate: null,
        isLoading: false,
        
        toggleVenue(venue) {
            const index = this.selectedVenues.indexOf(venue);
            if (index > -1) {
                this.selectedVenues.splice(index, 1);
            } else {
                this.selectedVenues.push(venue);
            }
            this.applyFilters();
        },
        
        toggleCategory(category) {
            const index = this.selectedCategories.indexOf(category);
            if (index > -1) {
                this.selectedCategories.splice(index, 1);
            } else {
                this.selectedCategories.push(category);
            }
            this.applyFilters();
        },
        
        setDate(date) {
            this.selectedDate = date;
            this.applyFilters();
        },
        
        clearAll() {
            this.selectedVenues = [];
            this.selectedCategories = [];
            this.selectedDate = null;
            this.applyFilters();
        },
        
        applyFilters() {
            this.isLoading = true;
            console.log('Применяются фильтры:', {
                venues: this.selectedVenues,
                categories: this.selectedCategories,
                date: this.selectedDate
            });
            
            setTimeout(() => {
                this.isLoading = false;
            }, 500);
        }
    }
};
