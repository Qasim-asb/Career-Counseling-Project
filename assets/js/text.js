export const tableTextCreater = (unisArray) => {
  let html = "";
  unisArray.forEach(unis => {
    html += `
      <tr class="results-table__row">
        <td class="results-table__data results-table__data--university">${unis.university}</td>
        <td class="results-table__data results-table__data--fee">${unis.semester_fee} PKR</td>
        <td class="results-table__data results-table__data--location">${unis.location}</td>
      </tr>
    `
  });

  return `
    <h2 class="modal__title">Recommended Universities</h2>
    <table class="results-table">
      <thead class="results-table__header">
        <tr>
          <th class="results-table__heading">UNIVERSITY</th>
          <th class="results-table__heading">SEMESTER FEE</th>
          <th class="results-table__heading">LOCATION</th>
        </tr>
      </thead>
      <tbody>
        ${html}
      </tbody>
    </table>
    <button class="modal__button">CLOSE</button>
  `;
}

export const warningTextCreater = () => {
  return `
    <p class="alert__message">It is mandatory to select an option for every question.</p>
    <button class="modal__button">OK</button>
  `;
}