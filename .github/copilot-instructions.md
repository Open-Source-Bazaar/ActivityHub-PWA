# ActivityHub PWA - GitHub Copilot Instructions

ActivityHub PWA is a React Progressive Web Application built with Next.js 15, TypeScript, Bootstrap, and Workbox. It serves as a project scaffold and includes features like markdown article rendering, component editors, pagination tables, and scroll lists.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Critical Requirements

⚠️ **MANDATORY NODE.JS VERSION**: This project requires **Node.js >=22**. The build will fail on older versions with errors like "Array.fromAsync is not a function".

- Check Node.js version: `node --version`
- If using Node.js <22, the build WILL FAIL but development server may still work with warnings
- Development and linting commands work on Node.js 20+ but produce version warnings

## Working Effectively

### Initial Setup (REQUIRED for all development)

1. **Install global pnpm**: `npm install -g pnpm`
2. **Install dependencies**: `pnpm install` -- takes 3 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
3. **Verify setup**: `pnpm --version` (should be 10.x+)

**Important**: If you see "node_modules missing" error, you MUST run `pnpm install` first before any other commands.

### Development Workflow (FULLY VALIDATED)

- **Start development server**: `pnpm dev` -- starts in 5-15 seconds on http://localhost:3000
- **Run linting**: `pnpm lint` -- takes 15 seconds. NEVER CANCEL. Set timeout to 2+ minutes.
- **Run tests**: `pnpm test` -- runs lint-staged + lint, takes 15 seconds. Set timeout to 2+ minutes.

### Build Process (Node.js >=22 ONLY)

- **Production build**: `pnpm build` -- FAILS on Node.js <22 with "Array.fromAsync is not a function" error
  - ❌ CONFIRMED: Fails on Node.js 20.x with TypeError during article page prerendering
  - ✅ Would work on Node.js >=22 (estimated 30s-2 minutes when working)
  - NEVER CANCEL. Set timeout to 5+ minutes when using proper Node.js version.
- **Static export**: `pnpm export` -- builds and exports static files (also requires Node.js >=22)

### Docker Commands (May Fail Due to Network Issues)

- **Build Docker image**: `pnpm pack-image` -- takes 5-15 minutes. NEVER CANCEL. Set timeout to 20+ minutes.
  - May fail due to certificate/network issues in restricted environments
  - Requires Docker daemon to be running
- **Run container**: `pnpm container` -- removes existing container and starts new one

## Validation Scenarios

After making ANY changes, ALWAYS validate by running through these scenarios:

### Manual Testing Requirements

1. **Start development server**: `pnpm dev` and verify it starts without errors
2. **Navigate to homepage**: Visit http://localhost:3000 and verify page loads with navigation menu
3. **Test core pages**:
   - Component editor: http://localhost:3000/component (HTML and Block editors work)
   - Scroll list: http://localhost:3000/scroll-list (may show runtime errors due to API restrictions)
   - Article example: http://localhost:3000/article (shows markdown article listing)
   - Activity management: Check activity creation and forum management flows
4. **Test API endpoints**: Visit http://localhost:3000/api/hello and verify JSON response: `{"name":"John Doe"}`
5. **Check responsive design**: Test mobile/desktop layouts with Bootstrap components
6. **Verify PWA functionality**: Check service worker registration in dev tools (disabled in development)

### Pre-commit Validation

ALWAYS run before committing changes:

```bash
pnpm lint     # Fix linting issues automatically
pnpm test     # Runs linting + staged file checks
```

## Known Issues and Workarounds

### Build Failures

- **Symptom**: "Array.fromAsync is not a function" during build
- **Cause**: Node.js version <22
- **Solution**: Upgrade to Node.js >=22 OR document that builds don't work in current environment

### Docker Build Issues

- **Symptom**: "self-signed certificate in certificate chain" or "SELF_SIGNED_CERT_IN_CHAIN"
- **Cause**: Network restrictions or certificate issues
- **Workaround**: Document as "Docker build fails due to network limitations"

### Linting Warnings (Non-blocking)

The following warnings appear but don't break builds:

- Synchronous scripts warnings in \_document.tsx and NotFoundCard.tsx
- TypeScript `any` type warnings in API files
- Spell checker warnings for "reactbootstrap" and "dnpw"

## Key Project Structure

### Important Directories

- `pages/` - Next.js pages and API routes
- `components/` - Reusable React components
- `styles/` - CSS and styling files
- `public/` - Static assets (auto-generated PWA files)
- `.github/workflows/` - CI/CD configuration

### Configuration Files

- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js configuration with PWA, MDX, and Sentry
- `tsconfig.json` - TypeScript configuration
- `eslint.config.ts` - ESLint configuration
- `babel.config.js` - Babel configuration (disables SWC)
- `docker-compose.yml` - Docker deployment setup

### Environment Files

- `.env` - Default environment variables (committed)
- `.env.local` - Local overrides (gitignored, create as needed)

Required environment variables for full functionality:

```
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
```

## CI/CD Pipeline

The project uses GitHub Actions (`.github/workflows/main.yml`) for deployment to Vercel. The pipeline:

1. Runs on all branch pushes
2. Deploys to Vercel if secrets are configured
3. Production deployments happen on main branch

Required GitHub secrets for CI:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Common Commands Reference

### Package Management

```bash
pnpm install          # Install dependencies (3+ minutes)
pnpm --version        # Check pnpm version
```

### Development

```bash
pnpm dev             # Start development server (15-30s)
pnpm build           # Production build (Node.js >=22 only, 30s-2min)
pnpm start           # Start production server
pnpm export          # Build and export static files
```

### Code Quality

```bash
pnpm lint            # Run ESLint with auto-fix (15s)
pnpm lint:all        # Lint all files
pnpm test            # Run tests (lint-staged + lint, 15s)
```

### Docker

```bash
pnpm pack-image      # Build Docker image (5-15min, may fail)
pnpm container       # Run Docker container
```

## Troubleshooting

### "Unsupported engine" Warnings

- **Expected**: Warnings about Node.js version when <22
- **Impact**: Development works, builds fail
- **Action**: Document in changes or upgrade Node.js

### Build Hangs or Takes Too Long

- **Never cancel builds or installs** - they may take several minutes
- Set appropriate timeouts: installs (5min), builds (5min), Docker (20min)
- Wait for completion rather than assuming failure

### PWA Service Worker Issues

- Service workers are disabled in development (`PWA support is disabled`)
- Generated files in `public/` are gitignored (sw.js, workbox-\*.js)
- Clear browser cache if PWA features don't work properly

## Development Standards and Best Practices

Based on recent project review feedback, follow these critical development standards:

### Scope and Modification Guidelines

#### When fixing issues, make changes project-wide
- If a requirement applies to one component, apply it to ALL similar components
- Don't fix issues in isolation - check entire codebase for similar patterns
- Remove unused code and translation keys immediately when making replacements
- Always maintain consistency across all language files

### Navigation and UI Structure

#### Main Navigation Guidelines
- Main navigation should focus on user viewing links and core functionality accessible to all users
- Specialized management features should be integrated into their respective workflow contexts rather than exposed as standalone navigation items
- Essential content creation entry points should be prominently accessible but not clutter the main navigation
- Management and editing features should follow contextual access patterns through their respective workflows

#### Route Structure
- Follow RESTful patterns: `/activity/[id]/forum/[fid]/editor`
- Place management routes under activity context, not standalone
- Use `0` as ID for creation routes (e.g., `/activity/[id]/forum/0/editor` for new forum)

### Code Organization and Architecture

#### Import and Type Management
- When backend interfaces are already defined, don't add mock data or types, directly reference real interfaces
- ALWAYS import types from `@open-source-bazaar/activityhub-service` package when available
- NEVER create custom type definitions when official service types exist

#### Component Initialization
- Initialize models with proper parameters (e.g., `new ForumModel(activityId)`)
- Use class properties for model initialization: `forumStore = new ForumModel(this.props.activityId)`

#### File Structure
- No need for `index.ts` export files in SSR applications
- Create `index.tsx` for list pages that provide edit entry points
- Follow established architectural patterns from existing pages
- Delete unnecessary files and unused code promptly

### Translation and Internationalization

#### Critical Translation Requirements
- ALL plain text MUST be translated using i18n system
- This includes `alert()` messages, button text, labels, error messages, and field names
- Use consistent terminology across components (e.g., `start_time`, `end_time`, not activity-specific variants)

#### Translation Patterns
```typescript
// ✅ Correct - use translation functions for dynamic content
const placeTypeOptions = ({ t }: typeof i18n) => [
  { value: PlaceType.Room, label: t('meeting_room') },
  { value: PlaceType.Hall, label: t('lecture_hall') }
];

// ✅ Correct - unified error messages
invalidMessage: t('field_required')

// ❌ Wrong - hardcoded text
alert('Forum created successfully!');

// ❌ Wrong - specific field messages
invalidMessage: t('activity_name_required')
```

#### Translation Maintenance
- Remove unused translation keys when replacing with generic ones
- Keep translations consistent across all language files (zh-CN, en-US, zh-TW)
- Use generic field terms unless specifically scoped (prefer `t('name')` over `t('room_name')`)

### Component Design Patterns

#### CSS and Styling
```typescript
// ✅ Correct - use filter/join for complex conditional classes
className={[
  'card',
  onSelect && 'cursor-pointer',
  selected && 'border-primary'
].filter(Boolean).join(' ')}

// ❌ Wrong - template string concatenation
className={`card ${selectable ? 'cursor-pointer' : ''} ${selected ? 'border-primary' : ''}`}
```

#### Data Mapping
```typescript
// ✅ Correct - object mapping for enum-based labels
const placeTypeLabels = {
  [PlaceType.Room]: t('meeting_room'),
  [PlaceType.Hall]: t('lecture_hall')
};

// ❌ Wrong - array indexing (breaks if enum values change)
const placeTypeLabels = ['Room', 'Hall'];
```

#### Key Props and Array Handling
- Use meaningful identifiers for `key` props, not array indices
- Use optional chaining for array/object access: `place.openWeekDays?.length`
- Use proper key props: `key={device}` not `key={index}`

#### Component Props
- Avoid duplicate data in props interfaces
- If object contains `id`, don't add separate `id` prop
- Let external layout handle spacing, don't hardcode margins in components

### Form and Input Handling

#### Form Field Patterns
- Same backend type fields should maintain consistent configuration across different components and pages
- Use `SearchableInput` from `mobx-restful-table` instead of custom selectors
- Summary fields should use plain text (`rows: 3`), not rich text editors
- Use `renderTagInput` for multi-select inputs

#### Validation
- Use unified error messages: `t('field_required')` for all required field validation
- Apply consistent field types across components
- Use proper field validation patterns

### TypeScript and Import Standards

#### Props Interface Design
```typescript
// ✅ Correct - minimal props
export interface ForumEditorProps {
  forum?: Forum;
  activityId: number;
}

// ❌ Wrong - redundant props
export interface ForumEditorProps {
  id?: number;  // Don't add if forum object contains id
  forum?: Forum;
  activityId?: number;  // Should be required, not optional
}
```

#### Server-Side Props
- Validate route parameters properly
- Use proper TypeScript typing for `getServerSideProps`
- Only load data that's actually needed for rendering

### API and Backend Integration

#### Server-Side Rendering Patterns
```typescript
// ✅ Correct - validate parameters and handle missing data
export const getServerSideProps = compose<{ id: string; fid: string }, ForumEditorPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.id) return { props: {} };
    
    try {
      const forumStore = new ForumModel(+params!.id);
      const forum = await forumStore.getOne(+params!.fid);
      return { props: { forum } };
    } catch (error) {
      return { props: {} };
    }
  }
);
```

#### Model Initialization
- Pass required parameters through constructors: `new ForumModel(activityId)`
- Don't load unnecessary data - only fetch what's needed for rendering
- Use proper error handling in getServerSideProps

### Testing and Validation

#### Before Committing ANY Changes
1. Run `pnpm lint` to fix formatting and catch errors
2. Ensure all plain text is properly translated
3. Check that unused imports and translation keys are removed
4. Verify consistent patterns across similar components
5. Test that navigation flows work as expected

#### Manual Testing Priority
- Test core navigation between pages
- Verify form submission and validation messages
- Check responsive design on different screen sizes
- Ensure proper error handling and user feedback

### Global Design Principles

#### Data Management
- Places are global shared data - only editable from forum/activity context
- Don't create standalone management pages for shared resources
- Access editing through proper workflow (e.g., place editing from forum list)

#### Architecture Consistency
- Follow established patterns from existing components
- Use consistent API patterns and data flow
- Maintain proper separation of concerns

Always prioritize these project-specific standards over generic Next.js or React guidance when working in this specific codebase.
