import React from 'react'

/** Rounded note with two full lines and a short final line. */
export class AdmonitionNoteIcon extends React.Component {
  public override shouldComponentUpdate(): boolean {
    return false
  }

  public override render(): React.ReactElement {
    return createIcon(
      <React.Fragment>
        <rect x="4.5" y="3.5" width="15" height="17" rx="2.5" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </React.Fragment>,
    )
  }
}

/** Lightbulb with a compact, open base. */
export class AdmonitionTipIcon extends React.Component {
  public override shouldComponentUpdate(): boolean {
    return false
  }

  public override render(): React.ReactElement {
    return createIcon(
      <path d="M9 17v-1.3c0-.7-.3-1.3-.8-1.8a6 6 0 1 1 7.6 0c-.5.5-.8 1.1-.8 1.8V17ZM10 20h4" />,
    )
  }
}

/** Information marker, visually distinct from the note icon. */
export class AdmonitionInfoIcon extends React.Component {
  public override shouldComponentUpdate(): boolean {
    return false
  }

  public override render(): React.ReactElement {
    return createIcon(
      <React.Fragment>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5h.01M12 11v5.5" />
      </React.Fragment>,
    )
  }
}

/** Rounded warning triangle with an exclamation mark. */
export class AdmonitionCautionIcon extends React.Component {
  public override shouldComponentUpdate(): boolean {
    return false
  }

  public override render(): React.ReactElement {
    return createIcon(
      <React.Fragment>
        <path d="M10.3 4.5a2 2 0 0 1 3.4 0l7.1 12.3a2 2 0 0 1-1.7 3H4.9a2 2 0 0 1-1.7-3Z" />
        <path d="M12 9v4.5M12 16.5h.01" />
      </React.Fragment>,
    )
  }
}

/** Shield with a cross for a stronger danger signal. */
export class AdmonitionDangerIcon extends React.Component {
  public override shouldComponentUpdate(): boolean {
    return false
  }

  public override render(): React.ReactElement {
    return createIcon(
      <React.Fragment>
        <path d="M12 3l7.5 3v5.4c0 4.6-3.2 7.8-7.5 9.6-4.3-1.8-7.5-5-7.5-9.6V6Z" />
        <path d="m9.5 9.5 5 5m0-5-5 5" />
      </React.Fragment>,
    )
  }
}

function createIcon(children: React.ReactNode): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}
