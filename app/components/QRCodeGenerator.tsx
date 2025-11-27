// // components/QRCodeGenerator.jsx
// import { QRCodeSVG } from 'qrcode.react';
// import { useState } from 'react';

// interface QRCodeGeneratorProps {
//   brandId: string;
//   brandName: string;
//   className?: string;
// }

// export default function QRCodeGenerator({
//   brandId,
//   brandName,
//   className = ""
// }: QRCodeGeneratorProps) {
//   const [showQR, setShowQR] = useState(false);

//   const generateBrandURL = () => {
//     const baseUrl = window.location.origin;
//     return `${baseUrl}/brands/${brandId}`;
//   };

//   const downloadQRCode = () => {
//     const svg = document.getElementById(`qr-code-${brandId}`);
//     if (svg) {
//       const svgData = new XMLSerializer().serializeToString(svg);
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       const img = new Image();

//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx?.drawImage(img, 0, 0);
//         const pngFile = canvas.toDataURL('image/png');
//         const downloadLink = document.createElement('a');
//         downloadLink.download = `brewtpia-${brandName}-qrcode.png`;
//         downloadLink.href = pngFile;
//         downloadLink.click();
//       };

//       img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
//     }
//   };

//   return (
//     <div className={`relative ${className}`}>
//       {/* QR Code Toggle Button */}
//       <button
//         onClick={() => setShowQR(!showQR)}
//         className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors"
//       >
//         <span>📱</span>
//         Share Brand
//       </button>

//       {/* QR Code Modal */}
//       {showQR && (
//         <div className="absolute top-full right-0 mt-2 bg-white p-6 rounded-2xl shadow-xl border z-50 min-w-80">
//           <div className="text-center">
//             <h3 className="font-bold text-gray-900 mb-3">
//               Share {brandName}
//             </h3>

//             {/* QR Code Display */}
//             <div className="bg-white p-4 rounded-lg border mb-4 inline-block">
//               <QRCodeSVG
//                 id={`qr-code-${brandId}`}
//                 value={generateBrandURL()}
//                 size={200}
//                 bgColor="#ffffff"
//                 fgColor="#8B4513" // Match your brand color
//                 level="H"
//                 includeMargin={false}
//               />
//             </div>

//             <p className="text-sm text-gray-600 mb-4">
//               Scan to visit {brandName}'s collection
//             </p>

//             {/* Action Buttons */}
//             <div className="flex gap-2 justify-center">
//               <button
//                 onClick={downloadQRCode}
//                 className="px-4 py-2 bg-[#8B4513] text-white rounded-lg text-sm font-semibold hover:bg-[#6B3410] transition-colors"
//               >
//                 Download QR
//               </button>
//               <button
//                 onClick={() => setShowQR(false)}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
