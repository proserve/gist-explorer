import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import externalLink from '../assets/img/external-link.png';
import comment from '../assets/img/comment.png';
import fileCode from '../assets/img/file-code.png';

function githubDateFormat(date) {
  return moment(new Date(date), 'MM/DD/YYYY').month(0).from(moment().month(0));
}

const GistCard = ({ gist }) => {
  const fileNames = Object.keys(gist.files);
  return (
    <div className="gist-card">
      <div className="gist-header">
        <div>
          <a
            className="gist-link"
            href={gist.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >{gist.description
          || `${gist.owner.login}/${fileNames[0]}`}
            <img
              src={externalLink}
              alt="external link icon"
            />
          </a>
          <span> created {githubDateFormat(new Date(gist.created_at))}</span>
        </div>
        <div style={{ display: 'flex' }}>
          {fileNames.map(fileName => (
            gist.files[fileName].language
              ? (
                <span
                  key={fileName}
                  className="lang-badge"
                >{gist.files[fileName].language}
                </span>
              )
              : null))}
        </div>
      </div>
      <div className="gist-body">
        <div className="info">
          <span>
            <img src={comment} alt="comment" className="icon" />
            {gist.comments} comments
          </span>
          <span>
            <img src={fileCode} alt="files" className="icon" />
            {Object.keys(gist.files).length} files
          </span>
          <span>
              updated {githubDateFormat(new Date(gist.updated_at))}
          </span>
        </div>
        <div style={{ width: '100%' }}>
          {(gist.forks && gist.forks.length)
            ? (
              <div>
                <h3>Latest Forks</h3>
                <div className="gist-forks">
                  {gist.forks.map(
                    ({ node_id: nodeID, owner, html_url: htmlUrl }) => (
                      <div key={nodeID} className="gist-fork">
                        <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
                          <img
                            src={owner.avatar_url}
                            alt={`${owner.login} avatar`}
                            className="user-avatar"
                          />
                          <span>{owner.login}</span>
                        </a>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ) : (
              <h3 style={{ textAlign: 'center' }}>This gist has no
              fork
              </h3>
            )
          }
        </div>
      </div>
    </div>
  );
};

GistCard.propTypes = {
  gist: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GistCard;
