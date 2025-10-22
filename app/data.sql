-- Brands/Roasters Table
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    established INTEGER,
    logo_url VARCHAR(255),
    website_url VARCHAR(255),
    sustainability_rating INTEGER CHECK (sustainability_rating >= 1 AND sustainability_rating <= 5),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Categories
CREATE TYPE product_category AS ENUM (
    'coffee_beans',
    'grinder',
    'kettle',
    'brewer',
    'espresso_machine',
    'accessory'
);

-- Coffee Products Table
CREATE TABLE coffee_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    roast_level VARCHAR(20) CHECK (roast_level IN ('light', 'medium', 'dark', 'espresso')),
    flavor_profile JSONB, -- Array of flavors: ['chocolate', 'fruity', 'nutty']
    origin_country VARCHAR(50),
    process_method VARCHAR(50), -- washed, natural, honey
    altitude INTEGER, -- meters
    price DECIMAL(10,2) NOT NULL,
    weight_grams INTEGER,
    in_stock BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Equipment Products Table
    CREATE TABLE equipment_products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
        category product_category NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        specifications JSONB, -- { "material": "stainless steel", "capacity": "1.2L" }
        price DECIMAL(10,2) NOT NULL,
        in_stock BOOLEAN DEFAULT TRUE,
        recommended_for JSONB, -- Array of brew methods: ['pourOver', 'espresso']
        skill_level VARCHAR(20) CHECK (skill_level IN ('beginner', 'intermediate', 'expert')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Quiz Recommendation Rules Table
CREATE TABLE quiz_recommendation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_type VARCHAR(50) NOT NULL, -- 'brew_method', 'experience_level', 'roast_preference'
    rule_value VARCHAR(100) NOT NULL, -- 'espresso', 'beginner', 'light'
    recommended_coffee_traits JSONB, -- { "roast_level": ["medium", "dark"], "flavor_profile": ["chocolate"] }
    recommended_equipment_categories JSONB, -- ['espresso_machine', 'grinder']
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);-- Insert Popular Coffee Brands
INSERT INTO brands (name, description, location, established, sustainability_rating, featured) VALUES
('Summit Roasters', 'Specialty single-origin coffees from high-altitude farms', 'Portland, OR', 2015, 5, TRUE),
('Method Coffee', 'Precision-focused roasting with scientific approach', 'San Francisco, CA', 2018, 4, TRUE),
('Conscious Cup', 'Ethical sourcing and sustainable practices', 'Austin, TX', 2016, 5, TRUE),
('Blue Bottle Coffee', 'Modern specialty coffee pioneer', 'Oakland, CA', 2002, 4, TRUE),
('Intelligentsia', 'Direct trade specialty coffee', 'Chicago, IL', 1995, 4, TRUE),
('Stumptown Coffee', 'Pioneers of third-wave coffee movement', 'Portland, OR', 1999, 4, TRUE);

-- Insert Equipment Brands
INSERT INTO brands (name, description, location, established, featured) VALUES
('Fellow', 'Design-forward coffee brewing products', 'San Francisco, CA', 2013, TRUE),
('Baratza', 'Premium coffee grinders for every need', 'Seattle, WA', 1999, TRUE),
('Hario', 'Japanese glassware and coffee equipment', 'Tokyo, Japan', 1921, TRUE),
('Breville', 'Innovative kitchen appliances', 'Sydney, Australia', 1932, TRUE),
('Acaia', 'Precision coffee scales and tech', 'Taipei, Taiwan', 2014, TRUE),
('Chemex', 'Iconic pour-over coffee makers', 'Massachusetts, USA', 1941, TRUE);-- Insert Popular Coffee Brands
INSERT INTO brands (name, description, location, established, sustainability_rating, featured) VALUES
('Summit Roasters', 'Specialty single-origin coffees from high-altitude farms', 'Portland, OR', 2015, 5, TRUE),
('Method Coffee', 'Precision-focused roasting with scientific approach', 'San Francisco, CA', 2018, 4, TRUE),
('Conscious Cup', 'Ethical sourcing and sustainable practices', 'Austin, TX', 2016, 5, TRUE),
('Blue Bottle Coffee', 'Modern specialty coffee pioneer', 'Oakland, CA', 2002, 4, TRUE),
('Intelligentsia', 'Direct trade specialty coffee', 'Chicago, IL', 1995, 4, TRUE),
('Stumptown Coffee', 'Pioneers of third-wave coffee movement', 'Portland, OR', 1999, 4, TRUE);

INSERT INTO coffee_products (brand_id, name, description, roast_level, flavor_profile, origin_country, process_method, altitude, price, weight_grams) VALUES
-- Summit Roasters
((SELECT id FROM brands WHERE name = 'Summit Roasters'), 'Ethiopia Yirgacheffe', 'Bright and floral with bergamot and blueberry notes', 'light', '["fruity", "floral", "bright"]', 'Ethiopia', 'washed', 2100, 24.99, 340),
((SELECT id FROM brands WHERE name = 'Summit Roasters'), 'Colombia Huila', 'Balanced with chocolate and caramel sweetness', 'medium', '["chocolate", "caramel", "balanced"]', 'Colombia', 'washed', 1800, 22.99, 340),

-- Method Coffee
((SELECT id FROM brands WHERE name = 'Method Coffee'), 'Precision Espresso Blend', 'Consistent and creamy espresso with dark chocolate notes', 'espresso', '["chocolate", "nutty", "creamy"]', 'Blend', 'washed', NULL, 26.99, 340),
((SELECT id FROM brands WHERE name = 'Method Coffee'), 'Single Origin Brazil', 'Nutty and smooth with low acidity', 'medium', '["nutty", "smooth", "chocolate"]', 'Brazil', 'natural', 1200, 20.99, 340),

-- Conscious Cup
((SELECT id FROM brands WHERE name = 'Conscious Cup'), 'Organic Peru', 'Fair trade organic coffee with sweet notes', 'medium', '["sweet", "balanced", "caramel"]', 'Peru', 'washed', 1600, 23.99, 340),
((SELECT id FROM brands WHERE name = 'Conscious Cup'), 'Decaf Colombian', 'Swiss water process decaf with chocolate notes', 'medium', '["chocolate", "smooth", "balanced"]', 'Colombia', 'washed', 1500, 21.99, 340);-- Insert Equipment Products
INSERT INTO equipment_products (brand_id, category, name, description, specifications, price, recommended_for, skill_level) VALUES
-- Grinders
((SELECT id FROM brands WHERE name = 'Baratza'), 'grinder', 'Encore Conical Burr Grinder', 'Perfect entry-level grinder for brew methods', '{"burrs": "conical", "grind_settings": 40, "hopper_capacity": "8oz"}', 169.00, '["pourOver", "drip", "frenchPress"]', 'beginner'),
((SELECT id FROM brands WHERE name = 'Baratza'), 'grinder', 'Sette 270 Wi', 'Advanced grinder for espresso with weight-based dosing', '{"burrs": "conical", "grind_settings": 270, "dosing": "weight-based"}', 549.00, '["espresso"]', 'expert'),

-- Kettles
((SELECT id FROM brands WHERE name = 'Fellow'), 'kettle', 'Stagg EKG Electric Kettle', 'Precision pour-over kettle with temperature control', '{"capacity": "0.9L", "temperature_control": "true", "material": "stainless steel"}', 165.00, '["pourOver", "aeropress"]', 'intermediate'),
((SELECT id FROM brands WHERE name = 'Hario'), 'kettle', 'Buono Pouring Kettle', 'Classic stovetop gooseneck kettle', '{"capacity": "1.2L", "temperature_control": "false", "material": "stainless steel"}', 45.00, '["pourOver"]', 'beginner'),

-- Brewers
((SELECT id FROM brands WHERE name = 'Chemex'), 'brewer', 'Classic Series Pour-Over', 'Iconic glass pour-over brewer', '{"capacity": "6 cups", "material": "glass", "filters": "proprietary"}', 45.00, '["pourOver"]', 'beginner'),
((SELECT id FROM brands WHERE name = 'Hario'), 'brewer', 'V60 Ceramic Coffee Dripper', 'Popular cone-shaped pour-over brewer', '{"capacity": "2 cups", "material": "ceramic", "filters": "V60"}', 25.00, '["pourOver"]', 'beginner'),

-- Espresso Machines
((SELECT id FROM brands WHERE name = 'Breville'), 'espresso_machine', 'Bambino Plus', 'Compact automatic espresso machine', '{"pump_pressure": "15 bar", "milk_frothing": "automatic", "heating": "thermojet"}', 499.95, '["espresso"]', 'beginner'),
((SELECT id FROM brands WHERE name = 'Breville'), 'espresso_machine', 'Barista Express', 'Semi-automatic with built-in grinder', '{"pump_pressure": "15 bar", "milk_frothing": "manual", "grinder": "built-in"}', 749.95, '["espresso"]', 'intermediate'),

-- Accessories
((SELECT id FROM brands WHERE name = 'Acaia'), 'accessory', 'Pearl Scale', 'High-precision coffee scale with timer', '{"max_weight": "2000g", "precision": "0.1g", "connectivity": "bluetooth"}', 150.00, '["pourOver", "espresso", "frenchPress"]', 'intermediate'),
((SELECT id FROM brands WHERE name = 'Fellow'), 'accessory', 'Atmos Vacuum Canister', 'Air-tight coffee storage with vacuum seal', '{"capacity": "1.1L", "material": "glass", "seal": "vacuum"}', 40.00, '["all"]', 'beginner');-- Insert Quiz Recommendation Rules
INSERT INTO quiz_recommendation_rules (rule_type, rule_value, recommended_coffee_traits, recommended_equipment_categories, priority) VALUES
-- Brew Method Rules
('brew_method', 'espresso', '{"roast_level": ["espresso", "medium", "dark"], "flavor_profile": ["chocolate", "nutty", "caramel"]}', '["espresso_machine", "grinder"]', 1),
('brew_method', 'pourOver', '{"roast_level": ["light", "medium"], "flavor_profile": ["fruity", "floral", "bright"]}', '["kettle", "brewer", "grinder"]', 1),
('brew_method', 'frenchPress', '{"roast_level": ["medium", "dark"], "flavor_profile": ["chocolate", "nutty", "balanced"]}', '["brewer", "grinder"]', 1),
('brew_method', 'drip', '{"roast_level": ["medium"], "flavor_profile": ["balanced", "chocolate", "caramel"]}', '["brewer", "grinder"]', 1),
('brew_method', 'coldBrew', '{"roast_level": ["medium", "dark"], "flavor_profile": ["chocolate", "nutty", "smooth"]}', '["brewer"]', 1),

-- Experience Level Rules
('experience_level', 'beginner', '{}', '["brewer", "kettle"]', 2),
('experience_level', 'enthusiast', '{}', '["grinder", "kettle", "accessory"]', 2),
('experience_level', 'expert', '{}', '["espresso_machine", "grinder", "accessory"]', 2),

-- Roast Preference Rules
('roast_preference', 'light', '{"roast_level": ["light"], "flavor_profile": ["fruity", "floral", "bright"]}', '[]', 3),
('roast_preference', 'medium', '{"roast_level": ["medium"], "flavor_profile": ["balanced", "chocolate", "caramel"]}', '[]', 3),
('roast_preference', 'dark', '{"roast_level": ["dark", "espresso"], "flavor_profile": ["chocolate", "spicy", "bold"]}', '[]', 3),

-- Budget Rules
('budget', 'budget', '{}', '["brewer", "kettle"]', 4),
('budget', 'midrange', '{}', '["grinder", "brewer", "kettle"]', 4),
('budget', 'premium', '{}', '["espresso_machine", "grinder", "accessory"]', 4);



-- Update Coffee Brands with Websites
UPDATE brands SET website_url = 'https://summitroasters.com' WHERE name = 'Summit Roasters';
UPDATE brands SET website_url = 'https://methodicalcoffee.com' WHERE name = 'Method Coffee';
UPDATE brands SET website_url = 'https://consciouscup.com' WHERE name = 'Conscious Cup';
UPDATE brands SET website_url = 'https://bluebottlecoffee.com' WHERE name = 'Blue Bottle Coffee';
UPDATE brands SET website_url = 'https://intelligentsia.com' WHERE name = 'Intelligentsia';
UPDATE brands SET website_url = 'https://stumptowncoffee.com' WHERE name = 'Stumptown Coffee';

-- Update Equipment Brands with Websites
UPDATE brands SET website_url = 'https://fellowproducts.com' WHERE name = 'Fellow';
UPDATE brands SET website_url = 'https://baratza.com' WHERE name = 'Baratza';
UPDATE brands SET website_url = 'https://hario-usa.com' WHERE name = 'Hario';
UPDATE brands SET website_url = 'https://breville.com' WHERE name = 'Breville';
UPDATE brands SET website_url = 'https://acaia.co' WHERE name = 'Acaia';
UPDATE brands SET website_url = 'https://chemexcoffeemaker.com' WHERE name = 'Chemex';



-- Add coffee products for equipment brands that also roast coffee
INSERT INTO coffee_products (brand_id, name, description, roast_level, flavor_profile, origin_country, process_method, altitude, price, weight_grams, featured) VALUES

-- ========== FELLOW ==========
((SELECT id FROM brands WHERE name = 'Fellow'), 
 'Fellow Drops Exclusive Blend', 
 'Limited edition blend curated for Fellow Drops subscribers', 
 'medium', 
 '["balanced", "chocolate", "caramel"]', 
 'Blend', 'washed', NULL, 22.99, 340, TRUE),

((SELECT id FROM brands WHERE name = 'Fellow'), 
 'Atmos Reserve Colombia', 
 'Specialty single-origin for optimal storage in Atmos canisters', 
 'light', 
 '["fruity", "bright", "clean"]', 
 'Colombia', 'washed', 1800, 24.99, 340, FALSE),

-- ========== ACAIA ==========
((SELECT id FROM brands WHERE name = 'Acaia'), 
 'Acaia Precision Blend', 
 'Engineered for consistent brewing with precision scales', 
 'medium', 
 '["balanced", "sweet", "chocolate"]', 
 'Blend', 'washed', NULL, 26.99, 340, TRUE),

((SELECT id FROM brands WHERE name = 'Acaia'), 
 'Pearl Calibration Coffee', 
 'Specially roasted for scale calibration and testing', 
 'dark', 
 '["chocolate", "bold", "smooth"]', 
 'Brazil', 'natural', 1200, 19.99, 340, FALSE),

-- ========== BREVILLE ==========
((SELECT id FROM brands WHERE name = 'Breville'), 
 'Breville Barista Touch Beans', 
 'Optimized for Breville espresso machines', 
 'espresso', 
 '["chocolate", "nutty", "creamy"]', 
 'Blend', 'washed', NULL, 21.99, 340, TRUE),

((SELECT id FROM brands WHERE name = 'Breville'), 
 'Smart Grinder Pro Blend', 
 'Consistent grind profile for Breville grinders', 
 'medium', 
 '["balanced", "caramel", "nutty"]', 
 'Blend', 'washed', NULL, 20.99, 340, FALSE),

((SELECT id FROM brands WHERE name = 'Breville'), 
 'The Dose Control Coffee', 
 'Pre-measured for perfect dosing in Breville machines', 
 'medium', 
 '["sweet", "balanced", "chocolate"]', 
 'Blend', 'washed', NULL, 23.99, 340, TRUE);


 -- Add coffee products for equipment brands that also roast coffee
INSERT INTO coffee_products (brand_id, name, description, roast_level, flavor_profile, origin_country, process_method, altitude, price, weight_grams, featured) VALUES

-- ========== FELLOW ==========
((SELECT id FROM brands WHERE name = 'Fellow'), 
 'Fellow Drops Exclusive Blend', 
 'Limited edition blend curated for Fellow Drops subscribers', 
 'medium', 
 '["balanced", "chocolate", "caramel"]', 
 'Blend', 'washed', NULL, 22.99, 340, TRUE),

((SELECT id FROM brands WHERE name = 'Fellow'), 
 'Atmos Reserve Colombia', 
 'Specialty single-origin for optimal storage in Atmos canisters', 
 'light', 
 '["fruity", "bright", "clean"]', 
 'Colombia', 'washed', 1800, 24.99, 340, FALSE),

-- ========== ACAIA ==========
((SELECT id FROM brands WHERE name = 'Acaia'), 
 'Acaia Precision Blend', 
 'Engineered for consistent brewing with precision scales', 
 'medium', 
 '["balanced", "sweet", "chocolate"]', 
 'Blend', 'washed', NULL, 26.99, 340, TRUE),

((SELECT id FROM brands WHERE name = 'Acaia'), 
 'Pearl Calibration Coffee', 
 'Specially roasted for scale calibration and testing', 
 'dark', 
 '["chocolate", "bold", "smooth"]', 
 'Brazil', 'natural', 1200, 19.99, 340, FALSE),

-- ========== BREVILLE ==========
((SELECT id FROM brands WHERE name = 'Breville'), 
 'Breville Barista Touch Beans', 
 'Optimized for Breville espresso machines', 
 'espresso', 
 '["chocolate", "nutty", "creamy"]', 
 'Blend', 'washed', NULL, 21.99, 340, TRUE),

((SELECT id FROM brands WHERE name = 'Breville'), 
 'Smart Grinder Pro Blend', 
 'Consistent grind profile for Breville grinders', 
 'medium', 
 '["balanced", "caramel", "nutty"]', 
 'Blend', 'washed', NULL, 20.99, 340, FALSE),

((SELECT id FROM brands WHERE name = 'Breville'), 
 'The Dose Control Coffee', 
 'Pre-measured for perfect dosing in Breville machines', 
 'medium', 
 '["sweet", "balanced", "chocolate"]', 
 'Blend', 'washed', NULL, 23.99, 340, TRUE);





 -- Run in Supabase SQL Editor
-- CREATE TABLE contact_messages (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   name TEXT NOT NULL,
--   email TEXT NOT NULL,
--   message TEXT NOT NULL,
--   status TEXT DEFAULT 'unread', -- unread, read, replied
--   created_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- -- Enable realtime if you want
-- ALTER TABLE contact_messages REPLICA IDENTITY FULL;

-- -- Row Level Security (optional)
-- ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Anyone can insert messages" ON contact_messages 
--   FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Only admins can read messages" ON contact_messages 
--   FOR SELECT USING (auth.role() = 'authenticated');





-- ------TESTIMONIAL:
-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO testimonials (text, author, role, rating, featured) VALUES
(
  'I finally found coffee I actually look forward to every morning! The personalized quiz matched me with three amazing roasters I''d never have discovered otherwise.',
  'Sarah K.',
  'Coffee Enthusiast',
  5,
  true
),
(
  'As a barista, I''m picky about my beans. BrewTopia introduced me to incredible small-batch roasters that supply my cafe now. Game changer!',
  'Marcus T.',
  'Professional Barista',
  5,
  true
),
(
  'The flexibility to skip or modify my subscription makes this perfect for my unpredictable schedule. And the coffee is exceptional every time.',
  'Jessica L.',
  'Busy Professional',
  5,
  true
),
(
  'The quality of coffee is consistently outstanding. Every shipment feels like a special treat!',
  'David M.',
  'Coffee Lover',
  5,
  false
),
(
  'Best coffee subscription service I''ve tried. The personalized recommendations are spot on!',
  'Emily R.',
  'Software Engineer',
  5,
  false
);

-- Add 5 more testimonials
INSERT INTO testimonials (text, author, role, rating, featured) VALUES
(
  'The customer service is incredible! They helped me find the perfect roast for my espresso machine and even gave me brewing tips.',
  'Alex P.',
  'Home Barista',
  5,
  true
),
(
  'I''ve been a subscriber for 6 months and every delivery has been exceptional. The variety keeps my morning routine exciting!',
  'Michael B.',
  'Marketing Director',
  5,
  false
),
(
  'As someone new to specialty coffee, the guidance and education provided made me feel confident in my choices. Amazing experience!',
  'Olivia S.',
  'Coffee Newcomer',
  5,
  true
),
(
  'The sustainable sourcing and fair trade practices make me feel good about my purchase. Great coffee with a conscience!',
  'Daniel R.',
  'Environmental Advocate',
  5,
  false
),
(
  'Fast shipping and perfectly fresh beans every time. The packaging is beautiful and keeps the coffee at peak freshness.',
  'Sophia L.',
  'E-commerce Manager',
  5,
  false
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();