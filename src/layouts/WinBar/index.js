import React from 'react';
import MacOSBar from "./MacOSBar";
import Win32Bar from "./Win32Bar";

export default () => {
  const { node, electron, chrome } = window.electron.versions;
  const platform = window.electron.platform;

  const isMacOS = platform === 'darwin';
  return isMacOS ? <MacOSBar /> : <Win32Bar />
}
