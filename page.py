"""Page encapsulates a page on the website. """
#  AGPL-3.0 license
#  Copyright (c) 2024 Asger Jon Vistisen
from __future__ import annotations

from enum import auto

from worktoy.keenum import KeeNum


class Lang(KeeNum):
  """Lang is an enum indicating language. """

  FRENCH = auto()
  GERMAN = auto()
  ENGLISH = auto()
  DANISH = auto()
  NORWEGIAN = auto()
  SWEDISH = auto()


class Page:
  """Page encapsulates a page on the website. """

  lang: Lang  # enum indicating currently used language
  pageId: str  # language-independent page id, normally the english title

  def getTitle(self) -> str:
    """Returns the title of the page in the currently active language."""

  def getEjs(self) -> str:
    """Returns the ejs file path of the page in the currently active
    language."""

  def setLanguage(self, lang: Lang) -> None:
    """Sets the language of the page. """
    self.lang = lang
