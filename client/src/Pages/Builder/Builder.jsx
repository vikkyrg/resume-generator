import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";

import BuilderArea from "../BuilderArea";
import TemplateRegistry from "../../TemplateRegistry";

const Builder = () => {

  const { setThemeKey } = useContext(ResumeContext);

  const { id } = useParams();   // template id from URL

  const [SelectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {

    fetch("http://localhost:5000/api/templates")
      .then((res) => res.json())
      .then((data) => {

        console.log("ALL TEMPLATES FROM DB:", data);

        const found = data.find((t) => t._id === id);

        console.log("FOUND TEMPLATE:", found);

        if (
          found &&
          found.componentKey &&
          TemplateRegistry[found.componentKey]
        ) {

          console.log("FOUND componentKey:", found.componentKey);

          setSelectedTemplate(() => TemplateRegistry[found.componentKey]);
          setThemeKey(found.componentKey);

        } else {

          console.log("componentKey missing or invalid -> Using Theme1");

          setSelectedTemplate(() => TemplateRegistry["theme1"]);
          setThemeKey("theme1");   // ✅ ADDED

        }

      })
      .catch((err) => console.log("FETCH ERROR:", err));

  }, [id, setThemeKey]);   // ✅ UPDATED

  if (!SelectedTemplate) {
    return <h2>Loading Template...</h2>;
  }

  return (
    <BuilderArea
      theme={React.createElement(SelectedTemplate)}
    />
  );
};

export default Builder;
