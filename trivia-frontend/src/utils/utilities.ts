export const decodeHTML = (html: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const shuffleAnswers = (answers: string[]): string[] => {
  return answers.sort(() => Math.random() - 0.5);
};
