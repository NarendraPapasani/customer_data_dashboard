//create a not found page where an image and some text should be displayed use tailwind css for styling
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen mt-20">
      <img
        src="https://static.vecteezy.com/system/resources/previews/012/181/008/original/document-data-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg"
        alt="404"
        className="w-1/2 mt-5"
      />
      <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
      <p className="text-gray-600">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
