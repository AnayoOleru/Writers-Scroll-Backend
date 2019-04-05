const template = (
  title,
  body
) => `<div style="font-family:-apple-system, '.SFNSText-Regular', 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif; color: #666666; background:white; text-decoration: none;  margin-bottom: 50px">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
        <tr align="center">
          <td valign="top" style="width: 100%;">
            <tabl cellspacing="0" cellpadding="0" border="0" summary="">
              <tr align="center">
                <td valign="middle" style="width: 100%;">
                  <a href="#">
                    <img style="width: 125px; cursor: pointer" src="https://res.cloudinary.com/dnch08bzc/image/upload/v1554130472/logo_transparent.png" alt="Authors Haven">
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr align="center">
          <td valign="top" style="width: 80%;">
            <table style="padding: 0px; border: 0; max-width: 520px; text-align: center;" width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
              <tr align="center" style="margin: 0px 10px;">
                <td style="width: 100%; line-height: 24px; font-size: 11pt;">
                  <p>${title}</p>
                  <p>${body}</p>
                </td>
              </tr>
            </table>
            <table style="border-collapse:collapse; max-width: 520px; text-align: center; margin-top: 30px" cellpadding="0" cellspacing="0" border="0" summary="">
              <tr align="center">
                <td style="width: 100%;">
                  <p style="line-height: 20px; font-size: 0.75rem; color: #b3b3b3;">Sent by
                    <a href="#" style="color: #4a08ef;text-decoration: none;">Author's Haven</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`;

export default template;
