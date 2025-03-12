FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/website/api

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    libicu-dev \
    g++

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd intl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u 1000 -d /home/laravel laravel
RUN mkdir -p /home/laravel/.composer && \
    chown -R laravel:laravel /home/laravel

# Create application directory
RUN mkdir -p /var/www/website/api

# Copy existing application directory contents
COPY . /var/www/website/api

# Set permissions
RUN chown -R laravel:www-data /var/www/website/api && \
    chmod -R 775 /var/www/website/api && \
    chmod -R 777 /var/www/website/api/storage /var/www/website/api/bootstrap/cache

USER laravel

EXPOSE 9000
CMD ["php-fpm"]