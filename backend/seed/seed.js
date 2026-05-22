import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import Admin from '../models/Admin.js';
import Doctor from '../models/Doctor.js';
import Service from '../models/Service.js';
import ServiceDetail from '../models/ServiceDetail.js';
import Department from '../models/Department.js';

// Seed Data
const adminData = {
  name: 'VHRC Admin',
  email: 'admin@vhrc.com',
  password: 'admin123',
  role: 'admin'
};

const doctorsData = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1576669801945-7a346954da5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    experience: "15+ years",
    rating: 4.9,
    reviews: 324,
    education: "Harvard Medical School",
    specialties: ["Heart Surgery", "Interventional Cardiology", "Preventive Care"],
    location: "Main Campus",
    availability: "Mon-Fri",
    department: "Cardiology",
    languages: ["English", "Spanish"],
    certifications: ["Board Certified Cardiologist", "Fellow of American College of Cardiology"],
    bio: "Dr. Johnson is a leading cardiologist with over 15 years of experience in interventional cardiology and heart surgery."
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1612943733919-f9661f1331f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    experience: "12+ years",
    rating: 4.8,
    reviews: 256,
    education: "Johns Hopkins University",
    specialties: ["Brain Surgery", "Stroke Treatment", "Epilepsy Care"],
    location: "Neurology Center",
    availability: "Mon-Thu",
    department: "Neurology",
    languages: ["English", "Mandarin"],
    certifications: ["Board Certified Neurologist", "Stroke Specialist Certification"],
    bio: "Dr. Chen is an expert neurologist specializing in stroke care and brain surgery."
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    experience: "10+ years",
    rating: 4.9,
    reviews: 428,
    education: "Stanford Medical School",
    specialties: ["Child Development", "Vaccinations", "Adolescent Care"],
    location: "Children's Wing",
    availability: "Tue-Sat",
    department: "Pediatrics",
    languages: ["English", "Spanish"],
    certifications: ["Board Certified Pediatrician", "Adolescent Medicine Specialist"],
    bio: "Dr. Rodriguez is dedicated to providing comprehensive care for children from infancy through adolescence."
  },
  {
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    image: "https://images.unsplash.com/photo-1562673462-877b3612cbea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    experience: "18+ years",
    rating: 4.8,
    reviews: 189,
    education: "Mayo Clinic",
    specialties: ["Joint Replacement", "Sports Medicine", "Trauma Surgery"],
    location: "Orthopedic Center",
    availability: "Mon-Fri",
    department: "Orthopedics",
    languages: ["English"],
    certifications: ["Board Certified Orthopedic Surgeon", "Sports Medicine Fellowship"],
    bio: "Dr. Wilson is a highly experienced orthopedic surgeon specializing in joint replacement and sports medicine."
  },
  {
    name: "Dr. Lisa Park",
    specialty: "Ophthalmologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
    experience: "14+ years",
    rating: 4.9,
    reviews: 298,
    education: "University of California, San Francisco",
    specialties: ["Cataract Surgery", "LASIK", "Retinal Disorders"],
    location: "Eye Center",
    availability: "Mon-Wed-Fri",
    department: "Ophthalmology",
    languages: ["English", "Korean"],
    certifications: ["Board Certified Ophthalmologist", "Retinal Surgery Specialist"],
    bio: "Dr. Park is a skilled ophthalmologist with expertise in advanced eye surgeries."
  },
  {
    name: "Dr. Robert Thompson",
    specialty: "Internal Medicine",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800",
    experience: "20+ years",
    rating: 4.7,
    reviews: 445,
    education: "University of Pennsylvania",
    specialties: ["Diabetes Care", "Hypertension", "Preventive Medicine"],
    location: "Main Campus",
    availability: "Mon-Fri",
    department: "Internal Medicine",
    languages: ["English"],
    certifications: ["Board Certified Internal Medicine", "Diabetes Specialist"],
    bio: "Dr. Thompson is a seasoned internist focused on comprehensive adult care."
  }
];

const servicesData = [
  { title: "Cardiology", description: "Comprehensive heart care with advanced cardiac procedures and treatments.", icon: "Heart", color: "text-red-500 bg-red-50", hoverColor: "group-hover:bg-red-500 group-hover:text-white" },
  { title: "Neurology", description: "Expert brain and nervous system care with cutting-edge technology.", icon: "Brain", color: "text-purple-500 bg-purple-50", hoverColor: "group-hover:bg-purple-500 group-hover:text-white" },
  { title: "Ophthalmology", description: "Complete eye care services from routine exams to complex surgeries.", icon: "Eye", color: "text-blue-500 bg-blue-50", hoverColor: "group-hover:bg-blue-500 group-hover:text-white" },
  { title: "Pediatrics", description: "Specialized healthcare for infants, children, and adolescents.", icon: "Baby", color: "text-pink-500 bg-pink-50", hoverColor: "group-hover:bg-pink-500 group-hover:text-white" },
  { title: "Orthopedics", description: "Advanced bone, joint, and muscle care with minimally invasive techniques.", icon: "Bone", color: "text-orange-500 bg-orange-50", hoverColor: "group-hover:bg-orange-500 group-hover:text-white" },
  { title: "Internal Medicine", description: "Comprehensive primary care for adult patients with complex conditions.", icon: "Stethoscope", color: "text-green-500 bg-green-50", hoverColor: "group-hover:bg-green-500 group-hover:text-white" },
  { title: "Emergency Care", description: "24/7 emergency services with rapid response and critical care.", icon: "Activity", color: "text-red-600 bg-red-50", hoverColor: "group-hover:bg-red-600 group-hover:text-white" },
  { title: "Pharmacy", description: "Full-service pharmacy with prescription management and counseling.", icon: "Pill", color: "text-indigo-500 bg-indigo-50", hoverColor: "group-hover:bg-indigo-500 group-hover:text-white" }
];

const serviceDetailsData = [
  { title: "Cardiology", description: "Comprehensive heart care with advanced cardiac procedures and treatments.", icon: "Heart", image: "https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?q=80&w=1176&auto=format&fit=crop", color: "text-red-500 bg-red-50", procedures: ["Cardiac Catheterization", "Angioplasty", "Pacemaker Implantation", "Heart Surgery"], specialists: 8, yearsExperience: 25, emergencyAvailable: true, features: ["24/7 Emergency Cardiac Care", "State-of-the-art Cardiac Cath Lab", "Heart Failure Management", "Preventive Cardiology Programs", "Cardiac Rehabilitation"] },
  { title: "Neurology", description: "Expert brain and nervous system care with cutting-edge technology.", icon: "Brain", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", color: "text-purple-500 bg-purple-50", procedures: ["Brain Surgery", "Stroke Treatment", "Epilepsy Management", "Neuroimaging"], specialists: 6, yearsExperience: 20, emergencyAvailable: true, features: ["Advanced Neuroimaging", "Minimally Invasive Brain Surgery", "Stroke Center Excellence", "Epilepsy Monitoring Unit", "Neurological Rehabilitation"] },
  { title: "Ophthalmology", description: "Complete eye care services from routine exams to complex surgeries.", icon: "Eye", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800", color: "text-blue-500 bg-blue-50", procedures: ["Cataract Surgery", "LASIK", "Retinal Surgery", "Glaucoma Treatment"], specialists: 5, yearsExperience: 18, emergencyAvailable: false, features: ["Advanced Laser Eye Surgery", "Comprehensive Eye Exams", "Pediatric Ophthalmology", "Diabetic Eye Care", "Emergency Eye Services"] },
  { title: "Pediatrics", description: "Specialized healthcare for infants, children, and adolescents.", icon: "Baby", image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800", color: "text-pink-500 bg-pink-50", procedures: ["Well-Child Visits", "Vaccinations", "Developmental Assessments", "Acute Care"], specialists: 12, yearsExperience: 30, emergencyAvailable: true, features: ["Pediatric Emergency Department", "NICU & PICU Services", "Childhood Development Programs", "Adolescent Medicine", "Family-Centered Care"] },
  { title: "Orthopedics", description: "Advanced bone, joint, and muscle care with minimally invasive techniques.", icon: "Bone", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800", color: "text-orange-500 bg-orange-50", procedures: ["Joint Replacement", "Sports Medicine", "Trauma Surgery", "Spine Surgery"], specialists: 10, yearsExperience: 22, emergencyAvailable: true, features: ["Robotic-Assisted Surgery", "Sports Medicine Center", "Joint Replacement Center", "Spine Specialty Care", "Physical Therapy & Rehabilitation"] },
  { title: "Internal Medicine", description: "Comprehensive primary care for adult patients with complex conditions.", icon: "Stethoscope", image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800", color: "text-green-500 bg-green-50", procedures: ["Annual Physicals", "Chronic Disease Management", "Preventive Care", "Health Screenings"], specialists: 15, yearsExperience: 28, emergencyAvailable: false, features: ["Comprehensive Health Screenings", "Chronic Disease Management", "Preventive Medicine", "Geriatric Care", "Executive Health Programs"] }
];

const departmentsData = [
  { name: "Emergency Department", description: "24/7 emergency care with rapid response times and critical care specialists.", icon: "Activity", image: "https://images.pexels.com/photos/6753423/pexels-photo-6753423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", color: "text-red-500 bg-red-50", stats: { patients: "50,000+", response: "< 3 min", staff: "45", availability: "24/7" }, services: ["Trauma Care", "Cardiac Emergencies", "Stroke Treatment", "Pediatric Emergency", "Critical Care"], facilities: ["Level 1 Trauma Center", "Helicopter Landing Pad", "Advanced Life Support", "Emergency Surgery Suite", "Critical Care Units"], contactInfo: { phone: "(555) 123-4567", location: "Main Building - Ground Floor", director: "Dr. Sarah Mitchell" } },
  { name: "Cardiology Department", description: "Comprehensive heart care with advanced cardiac procedures and treatments.", icon: "Heart", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800", color: "text-red-500 bg-red-50", stats: { patients: "15,000+", response: "Same Day", staff: "28", availability: "Mon-Fri" }, services: ["Cardiac Catheterization", "Angioplasty & Stenting", "Pacemaker Implantation", "Heart Surgery", "Cardiac Rehabilitation"], facilities: ["Cardiac Catheterization Lab", "Electrophysiology Suite", "Cardiac Surgery OR", "Recovery Units", "Rehabilitation Center"], contactInfo: { phone: "(555) 123-4568", location: "Heart Center - 3rd Floor", director: "Dr. Sarah Johnson" } },
  { name: "Neurology Department", description: "Expert brain and nervous system care with cutting-edge technology.", icon: "Brain", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", color: "text-purple-500 bg-purple-50", stats: { patients: "12,000+", response: "24-48 hrs", staff: "22", availability: "Mon-Fri" }, services: ["Brain Surgery", "Stroke Treatment", "Epilepsy Management", "Neuroimaging", "Neurological Rehabilitation"], facilities: ["MRI & CT Scanners", "Neurosurgical Suites", "Epilepsy Monitoring Unit", "Stroke Unit", "Neuro ICU"], contactInfo: { phone: "(555) 123-4569", location: "Neuroscience Center - 4th Floor", director: "Dr. Michael Chen" } },
  { name: "Pediatrics Department", description: "Specialized healthcare for infants, children, and adolescents.", icon: "Baby", image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800", color: "text-pink-500 bg-pink-50", stats: { patients: "25,000+", response: "Same Day", staff: "35", availability: "24/7" }, services: ["Well-Child Visits", "Vaccinations", "Developmental Assessments", "Pediatric Surgery", "Adolescent Medicine"], facilities: ["Pediatric Emergency Room", "NICU & PICU", "Children's Surgery Suites", "Play Therapy Rooms", "Family Support Areas"], contactInfo: { phone: "(555) 123-4570", location: "Children's Wing - 2nd Floor", director: "Dr. Emily Rodriguez" } },
  { name: "Orthopedics Department", description: "Advanced bone, joint, and muscle care with minimally invasive techniques.", icon: "Bone", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800", color: "text-orange-500 bg-orange-50", stats: { patients: "18,000+", response: "1-2 weeks", staff: "30", availability: "Mon-Fri" }, services: ["Joint Replacement", "Sports Medicine", "Trauma Surgery", "Spine Surgery", "Physical Therapy"], facilities: ["Robotic Surgery Suite", "Sports Medicine Center", "Physical Therapy Gym", "Imaging Center", "Recovery Suites"], contactInfo: { phone: "(555) 123-4571", location: "Orthopedic Center - 5th Floor", director: "Dr. James Wilson" } },
  { name: "Ophthalmology Department", description: "Complete eye care services from routine exams to complex surgeries.", icon: "Eye", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800", color: "text-blue-500 bg-blue-50", stats: { patients: "8,000+", response: "1 week", staff: "15", availability: "Mon-Fri" }, services: ["Cataract Surgery", "LASIK Surgery", "Retinal Surgery", "Glaucoma Treatment", "Pediatric Eye Care"], facilities: ["LASIK Surgery Suite", "Retinal Imaging Center", "Optical Shop", "Low Vision Clinic", "Pediatric Eye Center"], contactInfo: { phone: "(555) 123-4572", location: "Eye Center - 1st Floor", director: "Dr. Lisa Park" } }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await Doctor.deleteMany({});
    await Service.deleteMany({});
    await ServiceDetail.deleteMany({});
    await Department.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Seed admin
    await Admin.create(adminData);
    console.log('👤 Admin user created: admin@vhrc.com / admin123');

    // Seed doctors
    await Doctor.insertMany(doctorsData);
    console.log(`👨‍⚕️ ${doctorsData.length} doctors seeded`);

    // Seed services
    await Service.insertMany(servicesData);
    console.log(`🏥 ${servicesData.length} services seeded`);

    // Seed service details
    await ServiceDetail.insertMany(serviceDetailsData);
    console.log(`📋 ${serviceDetailsData.length} service details seeded`);

    // Seed departments
    await Department.insertMany(departmentsData);
    console.log(`🏢 ${departmentsData.length} departments seeded`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
