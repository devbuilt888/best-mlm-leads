// 'use client';

// import { SignIn } from '@clerk/nextjs';
// import styled from 'styled-components';

// const Container = styled.div`
//   // min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #f9fafb;
//   padding: 1rem 1rem;
  
//   @media (min-width: 640px) {
//     padding: 3rem 1.5rem;
//   }
  
//   @media (min-width: 1024px) {
//     padding: 3rem 2rem;
//   }
// `;

// const Content = styled.div`
//   max-width: 28rem;
//   width: 100%;
//   display: flex;
//   // flex-direction: column;
//   // gap: 2rem;
// `;

// const Header = styled.div`
//   text-align: center;
// `;

// const Title = styled.h2`
//   // margin-top: 1.5rem;
//   font-size: 1.875rem;
//   font-weight: 800;
//   color: #111827;
//   margin-bottom: 0.5rem;
// `;

// const Subtitle = styled.p`
//   margin-top: 0.5rem;
//   font-size: 0.875rem;
//   color: #6b7280;
// `;

// const FormContainer = styled.div`
//   // margin-top: 2rem;
//   // display: flex;
//   // flex-direction: column;
//   // gap: 1.5rem;
// `;

// export default function SignInPage() {
//   return (
//     <Container>
//       <Content>
//         <FormContainer>
//           <SignIn
//             appearance={{
//               elements: {
//                 formButtonPrimary: `
//                   background-color: #2563eb;
//                   color: white;
//                   font-weight: 500;
//                   padding: 0.5rem 1rem;
//                   border-radius: 0.375rem;
//                   transition: background-color 0.2s;
//                   border: none;
//                   cursor: pointer;
                  
//                   &:hover {
//                     background-color: #1d4ed8;
//                   }
//                 `,
//                 card: `
//                   background-color: white;
//                   box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//                   border-radius: 0.5rem;
//                   padding: 2rem;
//                 `,
//                 headerTitle: `
//                   font-size: 1.5rem;
//                   font-weight: 700;
//                   color: #111827;
//                 `,
//                 headerSubtitle: `
//                   color: #6b7280;
//                 `,
//                 socialButtonsBlockButton: `
//                   width: 100%;
//                   display: flex;
//                   justify-content: center;
//                   align-items: center;
//                   padding: 0.5rem 1rem;
//                   border: 1px solid #d1d5db;
//                   border-radius: 0.375rem;
//                   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//                   background-color: white;
//                   font-size: 0.875rem;
//                   font-weight: 500;
//                   color: #374151;
//                   transition: background-color 0.2s;
//                   cursor: pointer;
                  
//                   &:hover {
//                     background-color: #f9fafb;
//                   }
//                 `,
//                 formFieldInput: `
//                   appearance: none;
//                   position: relative;
//                   display: block;
//                   width: 100%;
//                   padding: 0.5rem 0.75rem;
//                   border: 1px solid #d1d5db;
//                   border-radius: 0.375rem;
//                   color: #111827;
//                   font-size: 0.875rem;
                  
//                   &:focus {
//                     outline: none;
//                     border-color: #3b82f6;
//                     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//                   }
                  
//       &::placeholder {
//         color: #9ca3af;
//       }
//                 `,
//                 footerActionLink: `
//                   color: #2563eb;
//                   font-weight: 500;
//                   text-decoration: none;
                  
//                   &:hover {
//                     color: #1d4ed8;
//                   }
//                 `
//               }
//             }}
//           />
//         </FormContainer>
//       </Content>
//     </Container>
//   );
// } 