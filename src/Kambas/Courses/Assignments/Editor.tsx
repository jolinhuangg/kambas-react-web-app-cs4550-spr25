export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
                <label  htmlFor="wd-group"> Assignment Group </label>
            </td>
            <td align="left" valign="top">
                <select id="wd-group">
                <option value="assignments">ASSIGNMENT</option>
                </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
                <label  htmlFor="wd-display-grade-as"> Display Grade as </label>
            </td>
            <td align="left" valign="top">
                <select id="wd-display-grade-as">
                <option value="percentage">Percentage</option>
                </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
                <label  htmlFor="wd-submission-type"> Submission Type </label>
            </td>
            <td align="left" valign="top">
                <select id="wd-submission-type">
                <option value="online">Online</option>
                <option value="in-person">In Person</option>
                </select>
            </td>
          </tr>

          <tr>
            <td><br /></td>
            <td>
                <label> Online Entry Options</label><br />

                <input type="checkbox" id="wd-text-entry"/>
                <label htmlFor="wd-chkbox-drama">Text Entry</label><br/>

                <input type="checkbox" id="wd-website-url"/>
                <label htmlFor="wd-chkbox-fantasy">Website URL</label><br />

                <input type="checkbox" id="wd-media-recordings"/>
                <label htmlFor="wd-chkbox-scifi">Media Recordings</label><br/>

                <input type="checkbox" id="wd-student-annotation"/>
                <label htmlFor="wd-chkbox-comedy">Student Annotation </label><br/>

                <input type="checkbox" id="wd-file-upload"/>
                <label htmlFor="wd-chkbox-comedy">File Uploads </label><br/>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
                <label> Assign </label>
            </td>
            <td>
                <label htmlFor="wd-assign-to"> Assign to </label> <br />
                <input id="wd-assign-to" value="Everyone" />
            </td>
          </tr>

          <tr>
            <td> <br /> </td>
            <td>
                <label htmlFor="wd-due-date"> Due </label> <br />
                <input type="date"
                value="2024-05-13"
                id="wd-due-date"/><br/>
            </td>
          </tr>

          <tr>
            <td><br /></td>
            <td>
                <label htmlFor="wd-available-from"> Available from </label> <br />
                <input type="date"
                    value="2024-05-06"
                    id="wd-available-from"/><br/>
            </td>
            <td> 
                <label htmlFor="wd-available-until"> Available from </label> <br />
                <input type="date"
                    value="2024-05-20"
                    id="wd-available-until"/><br/>
            </td>
          </tr>
        </table>

        <table>
            <tr><br /></tr>
            <tr>
                <td align="right">
                    <button>Cancel</button>
                </td>
                <td align="right">
                    <button>Save</button>
                </td>
            </tr>
        </table>
      </div>
  );}
  