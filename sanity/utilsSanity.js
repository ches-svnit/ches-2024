import { createClient, groq } from "next-sanity";

export const revalidate = 1000;
export const dynamic = "force-dynamic";

const client = createClient({
  projectId: "5vjwz05a",
  dataset: "production",
  apiVersion: "2024-05-06",

  useCdn: false,
});

const EventQuery = groq`
*[_type == "events"] | order(title asc) {
  title,
  description,
  link,
  "CoverImage": cover_image.asset->url,
  "InnerImage":inner_image.asset->url,
  
}
`;

export async function getEvent() {
  return client.fetch(EventQuery, {
    cache: "no-cache",
  });
}

const AboutQuery = groq`
*[_type == "about"] | order(_createdAt asc){
  title,
  description,
  "ImageUrl": image.asset->url, 
} 

`;

export async function getAbout() {
  return client.fetch(AboutQuery, {
    cache: "no-cache",
  });
}

const AchievementQuery = groq`
*[_type == "achievement"] | order(updatedAt desc) {
  description,
  "ImageUrl": image.asset->url,
}
`;

export async function getAchievement() {
  return client.fetch(AchievementQuery, {
    cache: "no-cache",
  });
}

const CommitteeQuery = groq`
*[_type == "committee"]{
  head,
  committee,
  "ImageUrl": image.asset->url, 
  linkedin
}

`;

export async function getCommittee() {
  return client.fetch(CommitteeQuery, {
    cache: "no-cache",
  });
}

// const StudentAdvisorsQuery = groq`
// *[_type == "StudentAdvisors"] | order(StudentAdvisors asc) {
//   advisoryDepartment,
//   advisor,
//   "ImageUrl": image.asset->url,
//   linkedin
// }
// `;

// export async function getAdvisor() {
//   return client.fetch(StudentAdvisorsQuery, {
//     cache: "no-cache",
//   });
// }

const StudentHeadsQuery = groq`
*[_type == "studentHeads"]{
  position,
   name,
   "ImageUrl": image.asset->url, 
    linkedin
    
 }
`;

export async function getStudentHeads() {
  return client.fetch(StudentHeadsQuery, {
    cache: "no-cache",
  });
}
const GalleryQuery = groq`*[_type == "gallery"]{
  
  "ImageUrl": image.asset->url,   
}`;

export async function getGallery() {
  return client.fetch(GalleryQuery, {
    cache: "no-cache",
  });
}

const NotificationsQuery = groq`
*[_type == "notifications"] | order(_createdAt desc) {
  description,
  "ImageUrl": image.asset->url,
  link
}`;

export async function getNotifications() {
  return client.fetch(NotificationsQuery, {
    cache: "no-store",
  });
}
const FacultyQuery = groq`
*[_type == "faculty"]{
  position,
   name,
   "ImageUrl": image.asset->url, 
    linkedin
    
 }
`;
export async function getFaculty() {
  return client.fetch(FacultyQuery, {
    cache: "no-cache",
  });
}
const PortalQuery = groq`
*[_type == "portal"]{
  title,
  link
}
`;

export async function getPortal() {
  return client.fetch(PortalQuery, {
    cache: "no-cache",
  });
}
