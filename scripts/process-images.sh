#!/bin/bash
# Process CLB_Images into optimized web-ready images
# Uses macOS sips for resizing, outputs to public/images/products/

BASE="/Users/joshuasemolik/Desktop/clbailey-site"
SRC="$BASE/CLB_Images"
DEST="$BASE/public/images/products"
MAX_WIDTH=1600
THUMB_WIDTH=800

process() {
  local src_file="$1"
  local dest_file="$2"
  local width="${3:-$MAX_WIDTH}"

  if [ ! -f "$src_file" ]; then
    echo "SKIP (not found): $src_file"
    return
  fi

  cp "$src_file" "$dest_file"
  sips --resampleWidth "$width" "$dest_file" --setProperty formatOptions 80 >/dev/null 2>&1
  local size=$(du -h "$dest_file" | cut -f1)
  echo "OK ($size): $dest_file"
}

echo "=== POOL TABLES ==="

# Skylar
process "$SRC/Skylar Pool Table/Old Images/New Background/New-Skylar.jpg" "$DEST/pool-tables/skylar/hero.jpg"
process "$SRC/Skylar Pool Table/New shots 4-2024/IMG_5861.jpg" "$DEST/pool-tables/skylar/angle.jpg" $THUMB_WIDTH
process "$SRC/Skylar Pool Table/Old Images/Rail and Nameplate hi-res/IMG_7813-nameplate.jpg" "$DEST/pool-tables/skylar/nameplate.jpg" $THUMB_WIDTH
process "$SRC/Skylar Pool Table/Old Images/Table Cover Insets/IMG_8129.jpg" "$DEST/pool-tables/skylar/dining-top.jpg" $THUMB_WIDTH
process "$SRC/Skylar Pool Table/Old Images/Graphite/Sky-Graph.jpg" "$DEST/pool-tables/skylar/graphite.jpg" $THUMB_WIDTH
process "$SRC/Skylar Pool Table/Old Images/Dimensions/Skylar-7-Pooltable-Dimensions.jpg" "$DEST/pool-tables/skylar/dimensions.jpg" $THUMB_WIDTH

# Viking
process "$SRC/Viking Table/Revised 8-18/Viking.jpg" "$DEST/pool-tables/viking/hero.jpg"
process "$SRC/Viking Table/Revised 8-18/Croppd.jpg" "$DEST/pool-tables/viking/angle.jpg"
process "$SRC/Viking Table/Revised 8-18/DSC00463.jpg" "$DEST/pool-tables/viking/detail.jpg" $THUMB_WIDTH
process "$SRC/Viking Table/Revised 8-18/Nameplate.jpg" "$DEST/pool-tables/viking/nameplate.jpg" $THUMB_WIDTH
process "$SRC/Viking Table/Revised Viking 7-20/Full-background.jpg" "$DEST/pool-tables/viking/lifestyle.jpg"

# Dutchess
process "$SRC/Dutchess/Support files/Revised Dutchess/Dutchess.jpg" "$DEST/pool-tables/dutchess/hero.jpg"
process "$SRC/Dutchess/Oct 5 2020/Graphite/Std-Green.jpg" "$DEST/pool-tables/dutchess/green.jpg"
process "$SRC/Dutchess/Oct 5 2020/Graphite/Diamond-124.jpg" "$DEST/pool-tables/dutchess/diamond-detail.jpg" $THUMB_WIDTH
process "$SRC/Dutchess/Support files/Rail Photos/Nameplate.jpg" "$DEST/pool-tables/dutchess/nameplate.jpg" $THUMB_WIDTH
process "$SRC/Dutchess/Support files/Revised Dutchess/Revised Dutchess Rails/Site.jpg" "$DEST/pool-tables/dutchess/rail.jpg" $THUMB_WIDTH
process "$SRC/Dutchess/Oct 5 2020/Graphite/DSC01443.jpg" "$DEST/pool-tables/dutchess/detail.jpg" $THUMB_WIDTH

# Tunbridge
process "$SRC/Tunbridge/New Work/cropped.jpg" "$DEST/pool-tables/tunbridge/hero.jpg"
process "$SRC/Tunbridge/New Work/Profile.jpg" "$DEST/pool-tables/tunbridge/profile.jpg" $THUMB_WIDTH
process "$SRC/Tunbridge/Photos/nameplate.jpg" "$DEST/pool-tables/tunbridge/nameplate.jpg" $THUMB_WIDTH
process "$SRC/Tunbridge/Photos/Diamond site.jpg" "$DEST/pool-tables/tunbridge/diamond.jpg" $THUMB_WIDTH
process "$SRC/Tunbridge/Photos/COB.jpg" "$DEST/pool-tables/tunbridge/detail.jpg" $THUMB_WIDTH
process "$SRC/Tunbridge/New Work/Dimensions/7 Tunbridge-Dimensions.jpg" "$DEST/pool-tables/tunbridge/dimensions.jpg" $THUMB_WIDTH

# Duke
process "$SRC/Duke/Support files/Final-Open.jpg" "$DEST/pool-tables/duke/hero.jpg"
process "$SRC/Duke/Support files/Final-Closed.jpg" "$DEST/pool-tables/duke/closed.jpg"
process "$SRC/Duke/Support files/Rails/nameplate.jpg" "$DEST/pool-tables/duke/nameplate.jpg" $THUMB_WIDTH
process "$SRC/Duke/Support files/Rails/Site.jpg" "$DEST/pool-tables/duke/rail.jpg" $THUMB_WIDTH
process "$SRC/Duke/Support files/Duke.jpg" "$DEST/pool-tables/duke/angle.jpg" $THUMB_WIDTH

# Norwich
process "$SRC/Norwich/New April 2 shots/final-open.jpg" "$DEST/pool-tables/norwich/hero.jpg"
process "$SRC/Norwich/New April 2 shots/Final-closed.jpg" "$DEST/pool-tables/norwich/closed.jpg"
process "$SRC/Norwich/New April 2 shots/Rail shots/Rail.jpg" "$DEST/pool-tables/norwich/rail.jpg" $THUMB_WIDTH
process "$SRC/Norwich/Norwich2.jpg" "$DEST/pool-tables/norwich/angle.jpg"

# Elayna
process "$SRC/Elayna/Elana revised Jan 2021/DSC02013-kahki.jpg" "$DEST/pool-tables/elayna/hero.jpg"
process "$SRC/Elayna/Elana revised Jan 2021/DSC02063.jpg" "$DEST/pool-tables/elayna/detail.jpg" $THUMB_WIDTH
process "$SRC/Elayna/Elana revised Jan 2021/DSC02031.jpg" "$DEST/pool-tables/elayna/angle.jpg"
process "$SRC/Elayna/Elana revised Jan 2021/DSC02054.jpg" "$DEST/pool-tables/elayna/side.jpg" $THUMB_WIDTH

# Adrian
process "$SRC/Adrian/Final/JPEGS/Adrian.jpg" "$DEST/pool-tables/adrian/hero.jpg"
process "$SRC/Adrian/Final/Detail shot.jpg" "$DEST/pool-tables/adrian/detail.jpg" $THUMB_WIDTH
process "$SRC/Adrian/Final/Back.jpg" "$DEST/pool-tables/adrian/back.jpg" $THUMB_WIDTH
process "$SRC/Adrian/Final/Front photo-.jpg" "$DEST/pool-tables/adrian/front.jpg" $THUMB_WIDTH

echo ""
echo "=== SHUFFLEBOARDS ==="

# Viking Shuffleboard
process "$SRC/Viking Shuffleboard/Viking SB Revised/Cover.jpg" "$DEST/shuffleboards/viking-shuffleboard/hero.jpg"
process "$SRC/Viking Shuffleboard/Viking SB Revised/Full-bacground-dark.jpg" "$DEST/shuffleboards/viking-shuffleboard/lifestyle.jpg"
process "$SRC/Viking Shuffleboard/Viking SB Revised/Cropped-dark.jpg" "$DEST/shuffleboards/viking-shuffleboard/profile.jpg"
process "$SRC/Viking Shuffleboard/Support files/end profile.jpg" "$DEST/shuffleboards/viking-shuffleboard/detail.jpg" $THUMB_WIDTH
process "$SRC/Viking Shuffleboard/Viking-Shuffleboard-Dimensions.jpg" "$DEST/shuffleboards/viking-shuffleboard/dimensions.jpg" $THUMB_WIDTH
process "$SRC/Viking Accessories/VIKING PHOTOS/Viking Shuffleboard/Viking-SB-Playfield.jpg" "$DEST/shuffleboards/viking-shuffleboard/playfield.jpg" $THUMB_WIDTH
process "$SRC/Viking Accessories/VIKING PHOTOS/Viking Shuffleboard/Viking-SB-score-count.jpg" "$DEST/shuffleboards/viking-shuffleboard/score-counter.jpg" $THUMB_WIDTH

# Skylar Shuffleboard
process "$SRC/Skylar Shuffleboard/Revised 9-20/Final.jpg" "$DEST/shuffleboards/skylar-shuffleboard/hero.jpg"
process "$SRC/Skylar Shuffleboard/Revised 9-20/COB.jpg" "$DEST/shuffleboards/skylar-shuffleboard/detail.jpg" $THUMB_WIDTH
process "$SRC/Skylar Shuffleboard/Revised 9-20/Skylar-Shuffleboard-Dimensions.jpg" "$DEST/shuffleboards/skylar-shuffleboard/dimensions.jpg" $THUMB_WIDTH
process "$SRC/Skylar Shuffleboard/Revised 9-20/DSC00598.jpg" "$DEST/shuffleboards/skylar-shuffleboard/angle.jpg"

# Tunbridge Shuffleboard
process "$SRC/Tunbridge Shuffleboards/Sell Sheet/Tunbridge-12-shuffleboard.jpg" "$DEST/shuffleboards/tunbridge-shuffleboard/hero.jpg"
process "$SRC/Tunbridge Shuffleboards/14' Tunbridge.jpg" "$DEST/shuffleboards/tunbridge-shuffleboard/14ft.jpg" $THUMB_WIDTH
process "$SRC/Tunbridge Shuffleboards/12' Tunbridge.jpg" "$DEST/shuffleboards/tunbridge-shuffleboard/12ft.jpg" $THUMB_WIDTH
process "$SRC/Tunbridge Shuffleboards/12-Tunbridge-Shuffleboard-Dimensions.jpg" "$DEST/shuffleboards/tunbridge-shuffleboard/dimensions.jpg" $THUMB_WIDTH
process "$SRC/Tunbridge Shuffleboards/Sell Sheet/End-detail.jpg" "$DEST/shuffleboards/tunbridge-shuffleboard/detail.jpg" $THUMB_WIDTH

# Level Best
process "$SRC/Level Best/Room setting_109853854.jpg" "$DEST/shuffleboards/level-best/hero.jpg"
process "$SRC/Level Best/C-angle.jpg" "$DEST/shuffleboards/level-best/carved-angle.jpg" $THUMB_WIDTH
process "$SRC/Level Best/M-Angle-22-final.jpg" "$DEST/shuffleboards/level-best/modern-angle.jpg" $THUMB_WIDTH
process "$SRC/Level Best/O-Angle.jpg" "$DEST/shuffleboards/level-best/original-angle.jpg" $THUMB_WIDTH
process "$SRC/Level Best/Bumper-Accessories.jpg" "$DEST/shuffleboards/level-best/accessories.jpg" $THUMB_WIDTH

echo ""
echo "=== GAME ROOM FURNITURE ==="

# Skylar Furniture
process "$SRC/Skylar Accessories/Spec Chair/P1019026.JPG" "$DEST/game-room-furniture/skylar-furniture/hero.jpg"
process "$SRC/Skylar Accessories/Bench/P1019076.JPG" "$DEST/game-room-furniture/skylar-furniture/bench.jpg" $THUMB_WIDTH
process "$SRC/Skylar Accessories/Cue Rack/P1019082.JPG" "$DEST/game-room-furniture/skylar-furniture/cue-rack.jpg" $THUMB_WIDTH
process "$SRC/Skylar Accessories/Dinning dolly/P1019063-web.jpg" "$DEST/game-room-furniture/skylar-furniture/dolly.jpg" $THUMB_WIDTH
process "$SRC/Skylar Accessories/Spec Chair/P1019028.JPG" "$DEST/game-room-furniture/skylar-furniture/chair-detail.jpg" $THUMB_WIDTH

# Tunbridge Furniture
process "$SRC/Tunbridge/Furniture/Tunbridge Spec Chair/IMG_2166.jpg" "$DEST/game-room-furniture/tunbridge-furniture/hero.jpg"
process "$SRC/Tunbridge/Furniture/Tunbridge Storage Bench/IMG_2189.jpg" "$DEST/game-room-furniture/tunbridge-furniture/bench.jpg" $THUMB_WIDTH
process "$SRC/Tunbridge/Furniture/Tunbridge Cuerack/IMG_2223.jpg" "$DEST/game-room-furniture/tunbridge-furniture/cue-rack.jpg" $THUMB_WIDTH

# Viking Furniture
process "$SRC/Viking Accessories/VIKING PHOTOS/Viking Furnishings/Viking-spec-chair.jpg" "$DEST/game-room-furniture/viking-furniture/hero.jpg"
process "$SRC/Viking Accessories/VIKING PHOTOS/Viking Furnishings/Viking-Bench.jpg" "$DEST/game-room-furniture/viking-furniture/bench.jpg" $THUMB_WIDTH
process "$SRC/Viking Accessories/VIKING PHOTOS/Viking Furnishings/Viking-Cuerack.jpg" "$DEST/game-room-furniture/viking-furniture/cue-rack.jpg" $THUMB_WIDTH
process "$SRC/Viking Accessories/VIKING PHOTOS/Viking Furnishings/Viking-spec-chair-detail.jpg" "$DEST/game-room-furniture/viking-furniture/chair-detail.jpg" $THUMB_WIDTH

echo ""
echo "=== CUE RACKS ==="

# Carved Leg Cue Rack
process "$SRC/clb carved leg cue rack profile image.jpg" "$DEST/cue-racks/carved-leg-cue-rack/hero.jpg" $THUMB_WIDTH
process "$SRC/clb carved leg cue rack open drawer image.jpg" "$DEST/cue-racks/carved-leg-cue-rack/open-drawer.jpg" $THUMB_WIDTH
process "$SRC/clb carved leg cue rack avalible finishes.jpg" "$DEST/cue-racks/carved-leg-cue-rack/finishes.jpg" $THUMB_WIDTH
process "$SRC/clb carved leg cue rack trad. mahogany.jpg" "$DEST/cue-racks/carved-leg-cue-rack/mahogany.jpg" $THUMB_WIDTH
process "$SRC/clb carved leg cue rack warm chesnut image.jpg" "$DEST/cue-racks/carved-leg-cue-rack/warm-chestnut.jpg" $THUMB_WIDTH

# Corner Cue Rack
process "$SRC/clb corner cue rack pofile image.jpg" "$DEST/cue-racks/corner-cue-rack/hero.jpg" $THUMB_WIDTH
process "$SRC/clb corner cue rack black image.jpg" "$DEST/cue-racks/corner-cue-rack/black.jpg" $THUMB_WIDTH
process "$SRC/clb corner cue rack classic oak image.jpg" "$DEST/cue-racks/corner-cue-rack/classic-oak.jpg" $THUMB_WIDTH
process "$SRC/clb corner cue rack honey maple image.jpg" "$DEST/cue-racks/corner-cue-rack/honey-maple.jpg" $THUMB_WIDTH
process "$SRC/clb corner cue rack finish option swatches.jpg" "$DEST/cue-racks/corner-cue-rack/finishes.jpg" $THUMB_WIDTH

# Deluxe Wall Rack
process "$SRC/clb deluxe wall rack profile image.jpg" "$DEST/cue-racks/deluxe-wall-rack/hero.jpg" $THUMB_WIDTH

echo ""
echo "=== BRAND ASSETS ==="

# Logo
process "$SRC/CL BAILEY LOGOS/CLB_LOGO.png" "$DEST/../brand/logo.png" $THUMB_WIDTH
process "$SRC/CL BAILEY LOGOS/CLB_LOGO-B-W.jpg" "$DEST/../brand/logo-bw.jpg" $THUMB_WIDTH
process "$SRC/CL BAILEY LOGOS/New-CLB-LOGO.jpg" "$DEST/../brand/logo-new.jpg" $THUMB_WIDTH

# Nameplate (for about page)
process "$SRC/Tunbridge/Photos/nameplate.jpg" "$DEST/../brand/nameplate.jpg" $THUMB_WIDTH

echo ""
echo "=== DONE ==="
echo "Total processed images:"
find "$DEST" "$DEST/../brand" -type f \( -name "*.jpg" -o -name "*.png" \) | wc -l
