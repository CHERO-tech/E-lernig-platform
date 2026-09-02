import BrandMark from "./BrandMark";

export default function SiteFooter() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a className="brand" href="#top">
              <BrandMark />
              FORGE
            </a>
            <p className="footer-desc">
              Practical, employer-verified skills in Software Development,
              Networking, and Multimedia.
            </p>
          </div>
          <div>
            <h4>Tracks</h4>
            <ul>
              <li>
                <a href="#tracks">Software Development</a>
              </li>
              <li>
                <a href="#tracks">Networking</a>
              </li>
              <li>
                <a href="#tracks">Multimedia</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#how">How it works</a>
              </li>
              <li>
                <a href="#difference">Why Forge</a>
              </li>
              <li>
                <a href="#employers">For employers</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Forge Learning</span>
          <span>Built for practical skills, not paperwork.</span>
        </div>
      </div>
    </footer>
  );
}
