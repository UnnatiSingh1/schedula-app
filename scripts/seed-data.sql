-- Seed data for Schedula appointment booking system

-- Insert sample users (patients)
INSERT INTO users (email, password_hash, name, phone, role) VALUES
('patient@schedula.com', '$2b$10$example_hash_1', 'John Doe', '+1-555-0101', 'patient'),
('jane.smith@email.com', '$2b$10$example_hash_2', 'Jane Smith', '+1-555-0102', 'patient'),
('mike.johnson@email.com', '$2b$10$example_hash_3', 'Mike Johnson', '+1-555-0103', 'patient'),
('sarah.wilson@email.com', '$2b$10$example_hash_4', 'Sarah Wilson', '+1-555-0104', 'patient');

-- Insert sample doctor users
INSERT INTO users (email, password_hash, name, phone, role) VALUES
('dr.sarah.johnson@schedula.com', '$2b$10$example_hash_5', 'Dr. Sarah Johnson', '+1-555-0201', 'doctor'),
('dr.michael.chen@schedula.com', '$2b$10$example_hash_6', 'Dr. Michael Chen', '+1-555-0202', 'doctor'),
('dr.emily.rodriguez@schedula.com', '$2b$10$example_hash_7', 'Dr. Emily Rodriguez', '+1-555-0203', 'doctor'),
('dr.james.wilson@schedula.com', '$2b$10$example_hash_8', 'Dr. James Wilson', '+1-555-0204', 'doctor'),
('dr.lisa.thompson@schedula.com', '$2b$10$example_hash_9', 'Dr. Lisa Thompson', '+1-555-0205', 'doctor'),
('dr.robert.davis@schedula.com', '$2b$10$example_hash_10', 'Dr. Robert Davis', '+1-555-0206', 'doctor');

-- Insert doctor details
INSERT INTO doctors (user_id, specialty, experience_years, location, consultation_fee, rating, bio, image_url) VALUES
(5, 'Cardiologist', 15, 'Downtown Medical Center', 150.00, 4.9, 'Experienced cardiologist specializing in heart disease prevention and treatment.', '/placeholder.svg?height=100&width=100'),
(6, 'Dermatologist', 12, 'Skin Care Clinic', 120.00, 4.8, 'Board-certified dermatologist with expertise in skin conditions and cosmetic procedures.', '/placeholder.svg?height=100&width=100'),
(7, 'Pediatrician', 10, 'Children''s Hospital', 100.00, 4.9, 'Dedicated pediatrician providing comprehensive care for children and adolescents.', '/placeholder.svg?height=100&width=100'),
(8, 'Orthopedic Surgeon', 18, 'Orthopedic Center', 200.00, 4.7, 'Specialized orthopedic surgeon with expertise in joint replacement and sports medicine.', '/placeholder.svg?height=100&width=100'),
(9, 'Neurologist', 14, 'Neuro Care Institute', 180.00, 4.8, 'Neurologist specializing in brain and nervous system disorders.', '/placeholder.svg?height=100&width=100'),
(10, 'General Physician', 8, 'Family Health Clinic', 80.00, 4.6, 'Family medicine physician providing primary care for patients of all ages.', '/placeholder.svg?height=100&width=100');

-- Insert doctor availability (Monday to Friday, 9 AM to 5 PM)
INSERT INTO doctor_availability (doctor_id, day_of_week, start_time, end_time) VALUES
-- Dr. Sarah Johnson (Cardiologist)
(1, 1, '09:00:00', '17:00:00'), -- Monday
(1, 2, '09:00:00', '17:00:00'), -- Tuesday
(1, 3, '09:00:00', '17:00:00'), -- Wednesday
(1, 4, '09:00:00', '17:00:00'), -- Thursday
(1, 5, '09:00:00', '17:00:00'), -- Friday

-- Dr. Michael Chen (Dermatologist)
(2, 1, '10:00:00', '18:00:00'),
(2, 2, '10:00:00', '18:00:00'),
(2, 3, '10:00:00', '18:00:00'),
(2, 4, '10:00:00', '18:00:00'),
(2, 5, '10:00:00', '18:00:00'),

-- Dr. Emily Rodriguez (Pediatrician)
(3, 1, '08:00:00', '16:00:00'),
(3, 2, '08:00:00', '16:00:00'),
(3, 3, '08:00:00', '16:00:00'),
(3, 4, '08:00:00', '16:00:00'),
(3, 5, '08:00:00', '16:00:00'),

-- Dr. James Wilson (Orthopedic Surgeon)
(4, 1, '09:00:00', '17:00:00'),
(4, 2, '09:00:00', '17:00:00'),
(4, 4, '09:00:00', '17:00:00'),
(4, 5, '09:00:00', '17:00:00'),

-- Dr. Lisa Thompson (Neurologist)
(5, 1, '09:00:00', '17:00:00'),
(5, 2, '09:00:00', '17:00:00'),
(5, 3, '09:00:00', '17:00:00'),
(5, 4, '09:00:00', '17:00:00'),
(5, 5, '09:00:00', '17:00:00'),

-- Dr. Robert Davis (General Physician)
(6, 1, '08:00:00', '18:00:00'),
(6, 2, '08:00:00', '18:00:00'),
(6, 3, '08:00:00', '18:00:00'),
(6, 4, '08:00:00', '18:00:00'),
(6, 5, '08:00:00', '18:00:00'),
(6, 6, '09:00:00', '13:00:00'); -- Saturday morning

-- Insert sample appointments
INSERT INTO appointments (booking_id, patient_id, doctor_id, appointment_date, appointment_time, status, reason, consultation_fee) VALUES
('SCHED001', 1, 1, '2024-01-15', '10:00:00', 'confirmed', 'Regular checkup for heart condition', 150.00),
('SCHED002', 2, 2, '2024-01-16', '14:30:00', 'confirmed', 'Skin rash examination', 120.00),
('SCHED003', 3, 3, '2024-01-17', '09:00:00', 'confirmed', 'Child vaccination', 100.00),
('SCHED004', 4, 4, '2024-01-18', '11:00:00', 'confirmed', 'Knee pain consultation', 200.00),
('SCHED005', 1, 5, '2024-01-19', '15:00:00', 'confirmed', 'Headache and dizziness', 180.00);

-- Generate time slots for the next 7 days for all doctors
-- This would typically be done by an application script, but here's a sample for one doctor for one day
INSERT INTO time_slots (doctor_id, slot_date, slot_time, is_booked) VALUES
-- Dr. Sarah Johnson - Today's slots
(1, CURRENT_DATE, '09:00:00', false),
(1, CURRENT_DATE, '09:30:00', true),
(1, CURRENT_DATE, '10:00:00', false),
(1, CURRENT_DATE, '10:30:00', false),
(1, CURRENT_DATE, '11:00:00', true),
(1, CURRENT_DATE, '11:30:00', false),
(1, CURRENT_DATE, '14:00:00', false),
(1, CURRENT_DATE, '14:30:00', false),
(1, CURRENT_DATE, '15:00:00', true),
(1, CURRENT_DATE, '15:30:00', false),
(1, CURRENT_DATE, '16:00:00', false),
(1, CURRENT_DATE, '16:30:00', false);
