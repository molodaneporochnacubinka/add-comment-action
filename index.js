
import * as core from '@actions/core';
import fetch from 'node-fetch';

try {
    const apiHost = 'https://api.tracker.yandex.net';
    const ticketId = core.getInput('ticket-id');
    const xOrgId = core.getInput('x-org-id');
    const token = core.getInput('token');
    const comment = core.getInput('comment');

    const url = `${apiHost}/v2/issues/${ticketId}/comments`;

    const options = {
      method: 'post',
      headers: {
          Authorization: `OAuth ${token}`,
          'X-Org-ID': xOrgId,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          text: comment
      }),
  };

  const response = await fetch(url, options);
    
  if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
  }

  await response.json();
} catch (error) {
  core.setFailed(error.message);
}
