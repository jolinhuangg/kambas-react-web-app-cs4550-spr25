import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaBell } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";
import { RiHomeGearFill } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import { TfiAnnouncement } from "react-icons/tfi";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "350px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button variant="secondary" size="small" className="w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish{" "}
          </Button>{" "}
        </div>
        <div className="w-50">
          <Button variant="success" size="small" className="w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish{" "}
          </Button>{" "}
        </div>
      </div>
      <br />
      <Button variant="secondary" size="small" className="w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content{" "}
      </Button>
      <Button variant="secondary" size="small" className="w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons{" "}
      </Button>

      <Button variant="secondary" size="small" className="w-100 mt-1 text-start">
      <RiHomeGearFill className="me-2 fs-5" /> Choose Home Page{" "}
      </Button>
      <Button variant="secondary" size="small" 
      className="w-100 mt-1 text-start">
      <SiSimpleanalytics className="me-2 fs-6" />View Course Stream
      </Button>
      <Button variant="secondary" size="small" className="w-100 mt-1 text-start">
      <TfiAnnouncement className="me-2 fs-6" />New Announcement
      </Button>
      <Button variant="secondary" size="small" className="w-100 mt-1 text-start">
      <SiSimpleanalytics className="me-2 fs-6" /> New Analytics
      </Button>
      <Button variant="secondary" size="small" className="w-100 mt-1 text-start">
       <FaBell className="me-2 fs-6" /> View Course Notifications
      </Button>
    </div>
  );
}
