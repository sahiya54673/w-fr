import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, SlidersHorizontal, Star, ShoppingBag, ArrowLeft, Search, CheckCircle, Heart, Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { fetchProducts } from '../services/api';

/* ─────────────────────────────────────────
   Per-category configuration
───────────────────────────────────────── */
const categoryConfig = {
  electronics: {
    name: 'Electronics',
    emoji: '⚡',
    subtitle: 'Smart Devices & Gadgets',
    accent: '#6366f1',
    accentBg: '#f5f3ff',
    heroImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop',
    description: 'Explore cutting-edge tech — from wireless audio to smart home devices, all curated for performance and style.',
    products: [
      { _id: 'e1', name: 'Aura Pro Headphones', price: 299.99, rating: 5, numReviews: 124, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop', tag: 'Bestseller', countInStock: 10 },
      { _id: 'e2', name: 'Quantum Smart Watch', price: 449.99, rating: 4, numReviews: 88, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop', tag: 'New', countInStock: 5 },
      { _id: 'e3', name: 'Prism 4K Camera', price: 899.99, rating: 5, numReviews: 45, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2070&auto=format&fit=crop', tag: '', countInStock: 0 },
      { _id: 'e4', name: 'Vortex BT Speaker', price: 159.99, rating: 4, numReviews: 72, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80', tag: '' },
      { _id: 'e5', name: 'NovaPad Pro Tablet', price: 649.99, rating: 5, numReviews: 33, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033&auto=format&fit=crop', tag: 'Sale' },
      { _id: 'e6', name: 'HaloLight Ring Kit', price: 89.99, rating: 4, numReviews: 210, image: 'https://images.unsplash.com/photo-1524143878510-e3b8d6312402?q=80&w=2072&auto=format&fit=crop', tag: '' },
      { _id: 'e7', name: 'Zenith Wireless Earbuds', price: 129.99, rating: 5, numReviews: 156, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'e8', name: 'KeyMech RGB Keyboard', price: 149.99, rating: 4, numReviews: 89, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'e9', name: 'UltraWide Curved Monitor', price: 499.99, rating: 5, numReviews: 42, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'e10', name: 'Smart Home Hub', price: 79.99, rating: 4, numReviews: 112, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop', tag: 'Sale' },
      { _id: 'e11', name: 'AeroStand Laptop Mount', price: 59.99, rating: 5, numReviews: 245, image: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'e12', name: 'Vision VR Headset', price: 399.99, rating: 4, numReviews: 67, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop', tag: 'New' },
    ],
  },
  fashion: {
    name: 'Fashion',
    emoji: '👗',
    subtitle: 'Trending Styles & Apparel',
    accent: '#ec4899',
    accentBg: '#fdf2f8',
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    description: 'From minimalist basics to bold statement pieces — discover styles that define your unique aesthetic.',
    products: [
      { _id: 'f1', name: 'Luxe Trench Coat', price: 349.99, rating: 5, numReviews: 96, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'f2', name: 'Silk Evening Dress', price: 229.99, rating: 5, numReviews: 54, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2040&auto=format&fit=crop', tag: 'New' },
      { _id: 'f3', name: 'Classic Oxford Shirt', price: 89.99, rating: 4, numReviews: 143, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop', tag: '' },
      { _id: 'f4', name: 'Slim Fit Chinos', price: 119.99, rating: 4, numReviews: 78, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1974&auto=format&fit=crop', tag: '' },
      { _id: 'f5', name: 'Cashmere Knit Sweater', price: 189.99, rating: 5, numReviews: 61, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2010&auto=format&fit=crop', tag: 'Sale' },
      { _id: 'f6', name: 'Premium Leather Belt', price: 69.99, rating: 4, numReviews: 202, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80', tag: '' },
      { _id: 'f7', name: 'Floral Summer Maxi', price: 79.99, rating: 5, numReviews: 128, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2046&auto=format&fit=crop', tag: '' },
      { _id: 'f8', name: 'Vintage Denim Jacket', price: 129.99, rating: 4, numReviews: 85, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1972&auto=format&fit=crop', tag: '' },
      { _id: 'f9', name: 'Chelsea Suede Boots', price: 159.99, rating: 5, numReviews: 44, image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1974&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'f10', name: 'Urban Explorer Pack', price: 89.99, rating: 4, numReviews: 112, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1972&auto=format&fit=crop', tag: '' },
      { _id: 'f11', name: 'Retro Aviator Shades', price: 59.99, rating: 5, numReviews: 230, image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80', tag: '' },
      { _id: 'f12', name: 'Soft Wool Blend Scarf', price: 44.99, rating: 4, numReviews: 76, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1974&auto=format&fit=crop', tag: 'Sale' },
    ],
  },
  kitchen: {
    name: 'Kitchen',
    emoji: '🍳',
    subtitle: 'Cookware & Essentials',
    accent: '#f59e0b',
    accentBg: '#fffbeb',
    heroImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop',
    description: 'Elevate your culinary experience with premium cookware, gadgets, and essentials trusted by top chefs.',
    products: [
      { _id: 'k1', name: 'Zenith Espresso Maker', price: 899.99, rating: 5, numReviews: 156, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=2043&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'k2', name: 'Cast Iron Dutch Oven', price: 249.99, rating: 5, numReviews: 89, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'k3', name: 'Marble Cutting Board', price: 79.99, rating: 4, numReviews: 114, image: 'https://images.unsplash.com/photo-1556909114-f23e81a5d7f5?q=80&w=2070&auto=format&fit=crop', tag: 'New' },
      { _id: 'k4', name: 'Professional Knife Set', price: 349.99, rating: 5, numReviews: 67, image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'k5', name: 'Smart Air Fryer XL', price: 199.99, rating: 4, numReviews: 238, image: 'https://images.unsplash.com/photo-1648704978826-5a29ea5f7b50?q=80&w=2070&auto=format&fit=crop', tag: 'Sale' },
      { _id: 'k6', name: 'Herb Garden Planter', price: 49.99, rating: 4, numReviews: 92, image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2080&auto=format&fit=crop', tag: '' },
      { _id: 'k7', name: 'Non-Stick Frying Pan', price: 59.99, rating: 5, numReviews: 187, image: 'https://images.unsplash.com/photo-1594833134782-20bc2ec81c9c?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'k8', name: 'Digital Kitchen Scale', price: 34.99, rating: 4, numReviews: 312, image: 'https://images.unsplash.com/photo-1590333746438-283583bb3417?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'k9', name: 'French Press Coffee', price: 44.99, rating: 5, numReviews: 89, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'k10', name: 'Silicone Utensil Set', price: 39.99, rating: 4, numReviews: 156, image: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'k11', name: 'Steel Magnetic Strip', price: 29.99, rating: 5, numReviews: 76, image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'k12', name: 'Glass Electric Kettle', price: 49.99, rating: 4, numReviews: 204, image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd679?q=80&w=2070&auto=format&fit=crop', tag: 'Sale' },
    ],
  },
  beauty: {
    name: 'Beauty',
    emoji: '✨',
    subtitle: 'Skincare & Cosmetics',
    accent: '#a855f7',
    accentBg: '#faf5ff',
    heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop',
    description: 'Luxury skincare, clean cosmetics and wellness rituals crafted from the finest natural ingredients.',
    products: [
      { _id: 'b1', name: 'Glow Serum 30ml', price: 89.99, rating: 5, numReviews: 312, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?q=80&w=2070&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'b2', name: 'Rose Gold Palette', price: 64.99, rating: 4, numReviews: 178, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop', tag: 'New' },
      { _id: 'b3', name: 'Hyaluronic Moisturiser', price: 54.99, rating: 5, numReviews: 224, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'b4', name: 'Velvet Matte Lipstick', price: 29.99, rating: 4, numReviews: 445, image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2e69?q=80&w=2080&auto=format&fit=crop', tag: '' },
      { _id: 'b5', name: 'Jade Face Roller', price: 39.99, rating: 5, numReviews: 189, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop', tag: 'Sale' },
      { _id: 'b6', name: 'Luxury Perfume Set', price: 149.99, rating: 5, numReviews: 93, image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'b7', name: 'Vitamin C Face Oil', price: 49.99, rating: 5, numReviews: 156, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'b8', name: 'Detox Clay Mask', price: 34.99, rating: 4, numReviews: 211, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'b9', name: 'Radiant Foundation', price: 44.99, rating: 5, numReviews: 88, image: 'https://images.unsplash.com/photo-1590156221122-c7b3d4ed2fd2?q=80&w=2070&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'b10', name: 'Daily Sun Protect', price: 39.99, rating: 4, numReviews: 342, image: 'https://images.unsplash.com/photo-1556228578-00c91f42289c?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'b11', name: 'Elite Makeup Brushes', price: 79.99, rating: 5, numReviews: 124, image: 'https://images.unsplash.com/photo-1522338223523-0de2c3d5ed21?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'b12', name: 'Silk Sleep Mask', price: 24.99, rating: 4, numReviews: 67, image: 'https://images.unsplash.com/photo-1583073030863-2442d34b318d?q=80&w=2070&auto=format&fit=crop', tag: 'Sale' },
    ],
  },
  health: {
    name: 'Health',
    emoji: '💪',
    subtitle: 'Wellness & Fitness',
    accent: '#10b981',
    accentBg: '#f0fdf4',
    heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
    description: 'Transform your fitness journey with premium workout gear, supplements, and wellness essentials.',
    products: [
      { _id: 'h1', name: 'Adjustable Dumbbells', price: 299.99, rating: 5, numReviews: 187, image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'h2', name: 'Yoga Pro Mat', price: 89.99, rating: 5, numReviews: 342, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop', tag: 'New' },
      { _id: 'h3', name: 'Smart Fitness Band', price: 149.99, rating: 4, numReviews: 214, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088&auto=format&fit=crop', tag: '' },
      { _id: 'h4', name: 'Whey Protein Blend', price: 69.99, rating: 4, numReviews: 489, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop', tag: 'Sale' },
      { _id: 'h5', name: 'Foam Roller Set', price: 44.99, rating: 4, numReviews: 132, image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?q=80&w=2076&auto=format&fit=crop', tag: '' },
      { _id: 'h6', name: 'Meditation Cushion', price: 59.99, rating: 5, numReviews: 76, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'h7', name: 'Resistance Band Kit', price: 39.99, rating: 5, numReviews: 156, image: 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'h8', name: 'Spiky Massage Ball', price: 19.99, rating: 4, numReviews: 211, image: 'https://images.unsplash.com/photo-1591946614421-1d977ff02021?q=80&w=2072&auto=format&fit=crop', tag: '' },
      { _id: 'h9', name: 'Protein Shaker Pro', price: 24.99, rating: 5, numReviews: 88, image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'h10', name: 'Body Analyst Scale', price: 89.99, rating: 4, numReviews: 342, image: 'https://images.unsplash.com/photo-1591453412154-15f79a95079a?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'h11', name: 'Pro Massage Gun', price: 199.99, rating: 5, numReviews: 124, image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'h12', name: 'Ergo Back Support', price: 54.99, rating: 4, numReviews: 67, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2050&auto=format&fit=crop', tag: 'Sale' },
    ],
  },
  sports: {
    name: 'Sports',
    emoji: '🏀',
    subtitle: 'Gear & Equipment',
    accent: '#ef4444',
    accentBg: '#fff1f2',
    heroImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop',
    description: 'Gear up for greatness — professional-grade sports equipment for every discipline and skill level.',
    products: [
      { _id: 's1', name: 'Pro Running Shoes', price: 189.99, rating: 5, numReviews: 267, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 's2', name: 'Carbon Fibre Bike', price: 2499.99, rating: 5, numReviews: 34, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop', tag: 'New' },
      { _id: 's3', name: 'Official Match Ball', price: 79.99, rating: 4, numReviews: 156, image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=2074&auto=format&fit=crop', tag: '' },
      { _id: 's4', name: 'Swim Goggles Pro', price: 49.99, rating: 4, numReviews: 98, image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 's5', name: 'Gym Gloves Flex', price: 34.99, rating: 4, numReviews: 211, image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop', tag: 'Sale' },
      { _id: 's6', name: 'Sports Water Bottle', price: 39.99, rating: 5, numReviews: 388, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 's7', name: 'Elite Tennis Racket', price: 149.99, rating: 5, numReviews: 124, image: 'https://images.unsplash.com/photo-1595435064214-0dfdf28a694c?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 's8', name: 'Compact Yoga Block', price: 19.99, rating: 4, numReviews: 312, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop', tag: '' },
      { _id: 's9', name: 'Pro Swim Cap', price: 14.99, rating: 5, numReviews: 89, image: 'https://images.unsplash.com/photo-1551632432-c7365737384f?q=80&w=2070&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 's10', name: 'Trek Carbon Poles', price: 89.99, rating: 4, numReviews: 156, image: 'https://images.unsplash.com/photo-1551632432-c7365737384f?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 's11', name: 'Elite Duffel Bag', price: 69.99, rating: 5, numReviews: 76, image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 's12', name: 'Pro Cycle Helmet', price: 129.99, rating: 4, numReviews: 204, image: 'https://images.unsplash.com/photo-1544191696-4021eaadca7d?q=80&w=2070&auto=format&fit=crop', tag: 'Sale' },
    ],
  },
  grocery: {
    name: 'Grocery',
    emoji: '🍎',
    subtitle: 'Fresh & Organic Essentials',
    accent: '#22c55e',
    accentBg: '#f0fdf4',
    heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop',
    description: 'Fresh from the farm to your table. Discover a wide selection of organic produce, pantry staples, and gourmet treats.',
    products: [
      { _id: 'g1', name: 'Organic Honey 500g', price: 14.99, rating: 5, numReviews: 245, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2000&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'g2', name: 'Premium Arabica Coffee', price: 19.99, rating: 5, numReviews: 188, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop', tag: 'New' },
      { _id: 'g3', name: 'Extra Virgin Olive Oil', price: 24.99, rating: 4, numReviews: 112, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'g4', name: 'Artisan Sourdough', price: 6.99, rating: 5, numReviews: 89, image: 'https://images.unsplash.com/photo-1585478259715-876a23d1ec5d?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'g5', name: 'Himalayan Pink Salt', price: 8.99, rating: 4, numReviews: 156, image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'g6', name: 'Organic Green Tea', price: 12.99, rating: 5, numReviews: 210, image: 'https://images.unsplash.com/photo-1544787210-2211d7c3199a?q=80&w=2070&auto=format&fit=crop', tag: 'Sale' },
      { _id: 'g7', name: 'Fresh Avocado Pack', price: 9.99, rating: 4, numReviews: 312, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'g8', name: 'Red Quinoa 1kg', price: 15.99, rating: 5, numReviews: 76, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'g9', name: 'Dark Chocolate 85%', price: 5.99, rating: 5, numReviews: 445, image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'g10', name: 'Pure Maple Syrup', price: 18.99, rating: 4, numReviews: 92, image: 'https://images.unsplash.com/photo-1589733429478-24597d58ba19?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'g11', name: 'Roasted Almonds 200g', price: 7.99, rating: 5, numReviews: 204, image: 'https://images.unsplash.com/photo-1508029052414-22295b94691c?q=80&w=2070&auto=format&fit=crop', tag: '' },
      { _id: 'g12', name: 'Cold Pressed Juice', price: 4.99, rating: 4, numReviews: 124, image: 'https://images.unsplash.com/photo-1613478223719-2ab80260f45c?q=80&w=2070&auto=format&fit=crop', tag: 'Sale' },
    ],
  },
  decor: {
    name: 'Home Decor',
    emoji: '🏠',
    subtitle: 'Art, Lighting & Accents',
    accent: '#8b5cf6',
    accentBg: '#f5f3ff',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop',
    description: 'Transform your living space into a sanctuary of style with our curated collection of art, lighting, and artisanal accents.',
    products: [
      { _id: 'd1', name: 'Minimalist Floor Lamp', price: 189.99, rating: 5, numReviews: 96, image: 'https://images.unsplash.com/photo-1507473885765-e6ed657f9971?q=80&w=2000&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'd2', name: 'Abstract Canvas Art', price: 299.99, rating: 5, numReviews: 42, image: 'https://images.unsplash.com/photo-1513519247388-19346422745b?q=80&w=2070&auto=format&fit=crop', tag: 'New' },
      { _id: 'd3', name: 'Ceramic Vase Set', price: 79.99, rating: 4, numReviews: 128, image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'd4', name: 'Velvet Throw Pillow', price: 49.99, rating: 5, numReviews: 215, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'd5', name: 'Handwoven Jute Rug', price: 249.99, rating: 4, numReviews: 64, image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=2000&auto=format&fit=crop', tag: 'Sale' },
      { _id: 'd6', name: 'Scented Soy Candle', price: 29.99, rating: 5, numReviews: 312, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'd7', name: 'Geometric Wall Shelf', price: 89.99, rating: 4, numReviews: 87, image: 'https://images.unsplash.com/photo-1532372576044-6733839a9d97?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'd8', name: 'Vintage Wall Clock', price: 119.99, rating: 5, numReviews: 53, image: 'https://images.unsplash.com/photo-1509130298739-651801c76e96?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'd9', name: 'Indoor Olive Tree', price: 159.99, rating: 4, numReviews: 124, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=2000&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'd10', name: 'Brass Mirror Frame', price: 199.99, rating: 5, numReviews: 38, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'd11', name: 'Knitted Cotton Pouf', price: 129.99, rating: 4, numReviews: 92, image: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'd12', name: 'Agate Bookends', price: 69.99, rating: 5, numReviews: 47, image: 'https://images.unsplash.com/photo-1544450579-73b0cdf12db0?q=80&w=2000&auto=format&fit=crop', tag: 'Sale' },
    ],
  },
  pets: {
    name: 'Pet Care',
    emoji: '🐾',
    subtitle: 'Premium Food & Toys',
    accent: '#f97316',
    accentBg: '#fff7ed',
    heroImage: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=2071&auto=format&fit=crop',
    description: 'Give your furry friends the best. From organic treats to designer beds, we have everything your pet deserves.',
    products: [
      { _id: 'p1', name: 'Orthopedic Dog Bed', price: 129.99, rating: 5, numReviews: 342, image: 'https://images.unsplash.com/photo-1591946614421-1d977ff02021?q=80&w=2000&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'p2', name: 'Interactive Cat Toy', price: 34.99, rating: 4, numReviews: 512, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2000&auto=format&fit=crop', tag: 'New' },
      { _id: 'p3', name: 'Grain-Free Dog Food', price: 59.99, rating: 5, numReviews: 824, image: 'https://images.unsplash.com/photo-1589924691106-073b697596cd?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'p4', name: 'Modern Cat Tower', price: 189.99, rating: 5, numReviews: 128, image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'p5', name: 'Automatic Pet Feeder', price: 149.99, rating: 4, numReviews: 245, image: 'https://images.unsplash.com/photo-1611755333063-94c6240299d0?q=80&w=2000&auto=format&fit=crop', tag: 'Sale' },
      { _id: 'p6', name: 'Gentle Grooming Kit', price: 44.99, rating: 4, numReviews: 156, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop', tag: '' },
      { _id: 'p7', name: 'Leather Dog Leash', price: 39.99, rating: 5, numReviews: 312, image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'p8', name: 'Plush Squeaky Toy', price: 14.99, rating: 4, numReviews: 890, image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'p9', name: 'Slow Feeder Bowl', price: 19.99, rating: 5, numReviews: 456, image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2000&auto=format&fit=crop', tag: 'Bestseller' },
      { _id: 'p10', name: 'Portable Water Bottle', price: 24.99, rating: 4, numReviews: 234, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'p11', name: 'CBD Pet Treats', price: 49.99, rating: 5, numReviews: 112, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2000&auto=format&fit=crop', tag: '' },
      { _id: 'p12', name: 'Washable Pet Mat', price: 34.99, rating: 4, numReviews: 198, image: 'https://images.unsplash.com/photo-1544175334-0370d0571343?q=80&w=2000&auto=format&fit=crop', tag: 'Sale' },
    ],
  },
};

const CategoryPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [addedId, setAddedId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const isWishlisted = wishlistItems.find((x) => x._id === product._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };
  const config = categoryConfig[name?.toLowerCase()] || null;

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1,
    }));
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getCategoryProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProducts({ category: name?.toLowerCase() });
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category products:', error);
        // Fallback to dummy if API fails (optional, but good for UX if DB is empty)
        setProducts(config?.products || []);
        setLoading(false);
      }
    };
    if (config) {
      getCategoryProducts();
    }
  }, [name, config]);

  if (!config) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Category Not Found</h2>
        <Link to="/" style={{ color: '#6366f1', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    );
  }

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── HERO BANNER ── */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img
          src={config.heroImage}
          alt={config.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Dark gradient overlay for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)' }} />
        {/* Accent color strip at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px', background: config.accent }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
          <div className="container">
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: '600' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <span style={{ color: '#fff' }}>{config.name}</span>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', borderRadius: '2rem', padding: '0.5rem 1.25rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.25)' }}>
                <span style={{ fontSize: '1.5rem' }}>{config.emoji}</span>
                <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{config.subtitle}</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.1 }}>
                {config.name}
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', maxWidth: '540px', lineHeight: '1.7' }}>
                {config.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem 2rem', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px', maxWidth: '400px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder={`Search in ${config.name}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.75rem', borderRadius: '0.75rem', border: '1.5px solid #e2e8f0', background: '#fff', fontSize: '0.875rem', outline: 'none', color: '#0f172a', transition: 'border-color 0.2s' }}
              onFocus={(e) => { e.target.style.borderColor = config.accent; }}
              onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
            />
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={16} style={{ color: '#64748b' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '0.65rem 1rem', borderRadius: '0.75rem', border: '1.5px solid #e2e8f0', background: '#fff', fontSize: '0.875rem', color: '#0f172a', outline: 'none', cursor: 'pointer' }}
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <span style={{ marginLeft: 'auto', fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>
            {filtered.length} products
          </span>
        </div>
      </div>

      {/* ── PRODUCTS GRID ── */}
      <div className="container" style={{ padding: '4rem 2rem 8rem' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem 0' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
              <Loader size={48} color={config.accent} />
            </motion.div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0', color: '#94a3b8' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>No products found for "{search}"</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
          >
            {filtered.map((product) => (
              <motion.div
                key={product._id}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } }}
              >
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    style={{ borderRadius: '1.25rem', overflow: 'hidden', background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', cursor: 'pointer', borderTop: `3px solid ${config.accent}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 40px -10px ${config.accent}30`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; }}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                      <motion.img
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.5 }}
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${product._id}/800/600`; }}
                      />
                      {product.tag && (
                        <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: product.tag === 'Sale' ? '#ef4444' : product.tag === 'New' ? '#10b981' : config.accent, color: '#fff', fontSize: '0.7rem', fontWeight: '800', padding: '0.3rem 0.75rem', borderRadius: '2rem', letterSpacing: '0.05em', zIndex: 2 }}>
                          {product.tag}
                        </span>
                      )}
                      <button 
                        onClick={(e) => toggleWishlist(e, product)}
                        style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#fff', border: 'none', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 15px rgba(0,0,0,0.1)', cursor: 'pointer', color: wishlistItems.find(x => x._id === product._id) ? '#ef4444' : '#1a1a1a', transition: 'all 0.3s', zIndex: 10 }}
                      >
                        <Heart size={18} fill={wishlistItems.find(x => x._id === product._id) ? '#ef4444' : 'none'} />
                      </button>
                      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: product.countInStock > 0 ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.65rem', fontWeight: '800', backdropFilter: 'blur(5px)', zIndex: 2 }}>
                        {product.countInStock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                        {product.name}
                      </h3>

                      {/* Stars */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', color: '#fbbf24' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13} fill={i < product.rating ? '#fbbf24' : 'none'} strokeWidth={1.5} />
                          ))}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>({product.numReviews})</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0f172a' }}>
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          disabled={product.countInStock === 0}
                          onClick={(e) => handleAddToCart(e, product)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: product.countInStock === 0 ? '#cbd5e1' : (addedId === product._id ? '#22c55e' : config.accentBg), color: product.countInStock === 0 ? '#fff' : (addedId === product._id ? '#fff' : config.accent), border: 'none', borderRadius: '0.65rem', padding: '0.6rem 1rem', fontSize: '0.8rem', fontWeight: '800', cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease' }}
                          onMouseEnter={(e) => { if (addedId !== product._id && product.countInStock > 0) { e.currentTarget.style.background = config.accent; e.currentTarget.style.color = '#fff'; } }}
                          onMouseLeave={(e) => { if (addedId !== product._id && product.countInStock > 0) { e.currentTarget.style.background = config.accentBg; e.currentTarget.style.color = config.accent; } }}
                        >
                          {product.countInStock === 0 ? 'Sold' : (addedId === product._id ? <><CheckCircle size={15} /> Added!</> : <><ShoppingBag size={15} /> Add</>)}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default CategoryPage;
