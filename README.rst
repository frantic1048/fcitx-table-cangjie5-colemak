fcitx-table-cangjie5-colemak
==============================

Fcitx Cangjie5 code table for Colemak layout.

Remapped Fcitx's Cangjie5 code table from Qwerty to Colemak.

.. image:: https://i.imgur.com/j5MRsvX.png

Get vector diagram: http://frantle.deviantart.com/art/Cangjie5-diagram-for-Colemak-layout-649013748

Install
==============================

Put ``table/cangjie5-colemak.conf`` and ``table/cangjie5-colemak.mb`` to your Fcitx table directory. On Arch Linux it is ``/usr/share/fcitx/table/``.

You may want to write a little package for your system to keep things clean.

Arch Linux
--------------

For Arch Linux users, just install ``fcitx-table-cangjie5-colemak`` from AUR:

https://aur.archlinux.org/packages/fcitx-table-cangjie5-colemak/

Usage
==============================

Activate ``Cangjie5-colemak`` input method on Fcitx and it's ready for you.

Why
==============================

Fcitx's Cangjie5 uses English letters to form code table. So Fcitx's layout switching cannot keep same word root(字根) at same key position across two layouts. Remapped code table fixes this problem.

Notes
==============================

If you are wondering how it is made out or want to convert another fcitx's input method's layout, this section may help.

This code table is directly made from Fcitx's Cangjie5 code table. Follow these steps:

.. code:: bash

    # copy Fcitx's ``cangjie5.mb`` and `cangjie5.conf` to whatever directory.
    cp /usr/share/fcitx/table/cangjie5.{conf,mb} WHATEVER_DIRECTORY/
    cd WHATEVER_DIRECTORY/

    # get a text version code table.
    mb2txt cangjie5.mb >cangjie5.txt

    # convert code table
    convert-qwerty-to-colemak.js cangjie5.txt
    # now we get ``cangjie5-colemak.txt``

    # convert new table back to .mb
    txt2mb cangjie5-colemak.txt cangjie5-colemak.mb

    # rename .conf file,
    # adjust it's ``UniqueName``, ``Name`` and ``File`` sections
    # to appropriate values.
    mv cangjie5.conf cangjie5-colemak.conf

    # now ``cangjie5-colemak.mb`` and ``cangjie5-colemak.conf`` are our converted table.

License
==============================

`GNU GPL v2`_

.. _`GNU GPL v2`: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
