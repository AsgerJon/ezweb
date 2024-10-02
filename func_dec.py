"""Decorator for triggering all decorated functions when one is called. """
#  AGPL-3.0 license
#  Copyright (c) 2024 Asger Jon Vistisen
from __future__ import annotations

from typing import Callable, Any


class GroupCall:
  """This class provides the decorator implementing the descriptor
  protocol. """

  __grouped_functions__ = None

  def _getGroupedFunctions(self) -> list[Callable]:
    """This method returns a dictionary of the grouped functions. """
    if self.__grouped_functions__ is None:
      self.__grouped_functions__ = []
    return self.__grouped_functions__

  def __call__(self, callMeMaybe: Callable) -> Callable:
    """This method is called when the instance of GroupCall is called.
    It is called with the function that is being decorated. """
    self.__grouped_functions__ = [*self._getGroupedFunctions(), callMeMaybe]

    def func(instance: object, *args, **kwargs) -> None:
      self.dispatch(instance, *args, **kwargs)

    return func

  def dispatch(self, instance: object, *args, **kwargs) -> None:
    """This method is called when the decorated function is called. """
    print(""" --- Beginning dispatch! --- """)
    for callMeMaybe in self._getGroupedFunctions():
      callMeMaybe(instance, *args, **kwargs)
    print(""" --- Dispatch complete! --- """)

  def __get__(self, instance: object, owner: type) -> Any:
    """This method handles the case where this instance of GroupCall is
    accessed through the owning class or an instance of the owning class. """
    if instance is None:
      return self

    def func(*args, **kwargs) -> None:
      self.dispatch(instance, *args, **kwargs)

    return func


class Test:
  """This test class owns a GroupCall instance. """

  group = GroupCall()

  @group
  def func1(self, *args, **kwargs) -> None:
    print("func1 called")

  @group
  def func2(self, *args, **kwargs) -> None:
    print("func2 called")


if __name__ == "__main__":
  t = Test()
  t.func1()
  t.func2()
