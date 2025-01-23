import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/canvas.jpeg" width={200} />
            <div>
              <h5> CS3500 Object Oriented Programming </h5>
              <p className="wd-dashboard-course-title">
                Java Design  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/canvas.jpeg" width={200} />
            <div>
              <h5> CS3000 Algorithms and Data Structures </h5>
              <p className="wd-dashboard-course-title">
                Algorithms  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/canvas.jpeg" width={200} />
            <div>
              <h5> PHIL1300 Philosophy and Technology </h5>
              <p className="wd-dashboard-course-title">
                Philosophy  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/canvas.jpeg" width={200} />
            <div>
              <h5> CS3200 Introduction to Databases </h5>
              <p className="wd-dashboard-course-title">
                MySQL  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/canvas.jpeg" width={200} />
            <div>
              <h5> ARTD2360 Introduction to Photography </h5>
              <p className="wd-dashboard-course-title">
                Photography  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/canvas.jpeg" width={200} />
            <div>
              <h5> CS4550 Web Development </h5>
              <p className="wd-dashboard-course-title">
                TSX & React  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/canvas.jpeg" width={200} />
            <div>
              <h5> IS4300 Human-Computer Interaction </h5>
              <p className="wd-dashboard-course-title">
                Human-Centered Design  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
